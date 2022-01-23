import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, finalize, Observable, of, switchMap } from 'rxjs';
import { DiaryItem } from 'src/app/services/data-structures/diary';
import { DiaryService } from 'src/app/services/diary.service';
import * as Translations from '../../../assets/translations/pl.json';
import { AddEditDiaryModalComponent } from '../add-edit-diary-modal/add-edit-diary-modal.component';
import { AddEditDiaryModalScenarios, AddEditDiaryModalScenariosType } from '../add-edit-diary-modal/data-structures.ts/scenarios';
import { RemoveWarningModalComponent } from '../remove-warning-modal/remove-warning-modal.component';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

    @ViewChild(AddEditDiaryModalComponent) addEditDiaryModal!: AddEditDiaryModalComponent;
    @ViewChild(RemoveWarningModalComponent) removeWarningModal!: RemoveWarningModalComponent;

    readonly translations = Translations;
    readonly addEditDiaryModalScenarios = AddEditDiaryModalScenarios;

    diaryItems: DiaryItem[] = [];
    loading = true;
    errorMessage = '';

    constructor(
        private readonly diaryService: DiaryService
    ) { }

    ngOnInit(): void {
        this.performActionOnBackendAndFetchData(() => of(true));
    }

    handleAddOrEditClick(scenario: AddEditDiaryModalScenariosType, item?: DiaryItem): void {
        if(scenario === this.addEditDiaryModalScenarios.ADD) {
            this.addEditDiaryModal.open(scenario);

        }
        else if(scenario === this.addEditDiaryModalScenarios.EDIT && item) {
            this.addEditDiaryModal.provideData(item);
            this.addEditDiaryModal.open(scenario);
        }
    }

    handleRemoveClick(item: DiaryItem): void {
        this.removeWarningModal.open(item);
    }

    handleTryAgainClick(): void {
        this.errorMessage = '';
        this.performActionOnBackendAndFetchData(() => of(true));
    }

    handleAddItem(item: DiaryItem): void {
        this.performActionOnBackendAndFetchData(this.diaryService.addDiaryItem.bind(this.diaryService), item);
    }

    handleEditItem(item: DiaryItem): void {
        this.performActionOnBackendAndFetchData(this.diaryService.editDiaryItem.bind(this.diaryService), item);
    }

    handleRemove(item: DiaryItem): void {
        this.performActionOnBackendAndFetchData(this.diaryService.removeDiaryItem.bind(this.diaryService), item);
    }

    private performActionOnBackendAndFetchData(callback: CallbackUnionType, item?: DiaryItem): void {
        this.loading = true;

        callback(item!).pipe(
            switchMap((_) => {
                return this.diaryService.getDiaryItems().pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                    catchError((_) => {
                        this.errorMessage = this.translations.Base.unknownError;
                        return of([]);
                    })
                );
            })
        )
        .subscribe({
            next: (res: DiaryItem[]) => {
                this.diaryItems = res;
            },
            error: (_) => {
                this.errorMessage = this.translations.Base.unknownError;
            }
        });
    }
}

type CallbackUnionType = ((item: DiaryItem) => Observable<boolean>) | (() => Observable<boolean>);