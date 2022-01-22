import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, delay, empty, finalize, Observable, of, switchMap, tap, throwError } from 'rxjs';
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

    constructor(private readonly diaryService: DiaryService) { }

    ngOnInit(): void {
        this.fetchData();
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

    handleAddItem(item: DiaryItem): void {
        this.performActionOnBackendAndFetchData(item, this.diaryService.addDiaryItem.bind(this.diaryService));
    }

    handleEditItem(item: DiaryItem): void {
        this.performActionOnBackendAndFetchData(item, this.diaryService.editDiaryItem.bind(this.diaryService));
    }

    handleRemove(item: DiaryItem): void {
        this.performActionOnBackendAndFetchData(item, this.diaryService.removeDiaryItem.bind(this.diaryService));
    }

    private fetchData(): void {
        this.diaryService.getDiaryItems().pipe(
            finalize(() => {
                this.loading = false;
            }),
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

    private performActionOnBackendAndFetchData(item: DiaryItem, callback: (item: DiaryItem) => Observable<boolean>): void {
        callback(item).pipe(
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
            error: (err) => {
                console.log(err);
                this.errorMessage = this.translations.Base.unknownError;
            }
        });
    }

    // private performAddingOnBackend(item: DiaryItem): void {
    //     this.loading = true;
    //     this.diaryService.addDiaryItem(item).pipe(
    //         switchMap((_) => {
    //             return this.diaryService.getDiaryItems().pipe(
    //                 finalize(() => {
    //                     this.loading = false;
    //                 }),
    //                 catchError((_) => {
    //                     this.errorMessage = this.translations.Base.unknownError;
    //                     return of([]);
    //                 })
    //             );
    //         })
    //     )
    //     .subscribe({
    //         next: (res: DiaryItem[]) => {
    //             this.diaryItems = res;
    //         },
    //         error: (_) => {
    //             this.errorMessage = this.translations.Base.unknownError;
    //         }
    //     });
    // }

    // private performEditingOnBackend(item: DiaryItem): void {
    //     this.loading = true;

    //     this.diaryService.editDiaryItem(item).pipe(
    //         switchMap((_) => {
    //             return this.diaryService.getDiaryItems().pipe(
    //                 finalize(() => {
    //                     this.loading = false;
    //                 }),
    //                 catchError((_) => {
    //                     this.errorMessage = this.translations.Base.unknownError;
    //                     return of([]);
    //                 })
    //             );
    //         })
    //     )
    //     .subscribe({
    //         next: (res: DiaryItem[]) => {
    //             this.diaryItems = res;
    //         },
    //         error: (_) => {
    //             this.errorMessage = this.translations.Base.unknownError;
    //         }
    //     });
    // }

    // private performRemovingOnBackend(item: DiaryItem): void {
    //     this.loading = true;

    //     this.diaryService.removeDiaryItem(item).pipe(
    //         switchMap((_) => {
    //             return this.diaryService.getDiaryItems().pipe(
    //                 finalize(() => {
    //                     this.loading = false;
    //                 }),
    //                 catchError((_) => {
    //                     this.errorMessage = this.translations.Base.unknownError;
    //                     return of([]);
    //                 })
    //             );
    //         })
    //     )
    //     .subscribe({
    //         next: (res: DiaryItem[]) => {
    //             this.diaryItems = res;
    //         },
    //         error: (_) => {
    //             this.errorMessage = this.translations.Base.unknownError;
    //         }
    //     });
    // }
}
