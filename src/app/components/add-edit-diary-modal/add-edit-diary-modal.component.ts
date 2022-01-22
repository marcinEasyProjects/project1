import { identifierName } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiaryItem } from 'src/app/services/data-structures/diary';
import * as Translations from '../../../assets/translations/pl.json';
import { AddEditForm } from './data-structures.ts/add-edit-form';
import { CloseReasons } from './data-structures.ts/close-reasons';
import { AddEditDiaryModalScenarios, AddEditDiaryModalScenariosType } from './data-structures.ts/scenarios';

@Component({
    selector: 'app-add-edit-diary-modal',
    templateUrl: './add-edit-diary-modal.component.html',
    styleUrls: ['./add-edit-diary-modal.component.scss']
})
export class AddEditDiaryModalComponent implements OnInit {

    @ViewChild('content') modalContent!: ElementRef;

    @Output() onAdd = new EventEmitter<DiaryItem>();
    @Output() onEdit = new EventEmitter<DiaryItem>();

    readonly translations = Translations;
    readonly closeReasons = CloseReasons;
    readonly scenarios = AddEditDiaryModalScenarios;

    scenario!: AddEditDiaryModalScenariosType;

    addEditForm!: AddEditForm;
    private editingItemId!: number;

    constructor(private readonly modalService: NgbModal) { }

    ngOnInit(): void {
        this.addEditForm = new FormGroup({
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            grade: new FormControl('', Validators.required),
            rating: new FormControl('', Validators.required),
        }) as AddEditForm;
    }

    open(scenario: AddEditDiaryModalScenariosType): void {
        this.scenario = scenario;

        this.modalService.open(this.modalContent).result.
            then((value) => {
                if(value === this.closeReasons.CONFIRM && this.scenario === this.scenarios.ADD) {
                    if(this.addEditForm.valid) {
                        this.onAdd.emit(this.addEditForm.value);
                    }
                }
                else if(value === this.closeReasons.CONFIRM && this.scenario === this.scenarios.EDIT) {
                    if(this.addEditForm.valid) {
                        this.onEdit.emit({id: this.editingItemId, ...this.addEditForm.value});
                    }
                }
            })
            .finally(() => {
                this.addEditForm.reset();
            });
    }

    provideData(item: DiaryItem): void {
        if(item.id) {
            const {id, ...rest} = item;
            this.editingItemId = id;
            this.addEditForm.patchValue(rest);
        }
        else {
            throw Error('Id should be provided!');
        }
    }
}
