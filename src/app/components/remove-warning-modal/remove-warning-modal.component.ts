import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Translations from '../../../assets/translations/pl.json';
import { CloseReasons } from './data-structures.ts/close-reasons';

@Component({
    selector: 'app-remove-warning-modal',
    templateUrl: './remove-warning-modal.component.html',
    styleUrls: ['./remove-warning-modal.component.scss']
})
export class RemoveWarningModalComponent implements OnInit {

    @ViewChild('content') modalContent!: ElementRef;

    @Output() onRemove = new EventEmitter<any>();

    readonly translations = Translations;
    readonly closeReasons = CloseReasons;

    constructor(private readonly modalService: NgbModal) { }

    ngOnInit(): void {}

    open(data: any): void {
        this.modalService.open(this.modalContent).result.
            then((value) => {
                if(value === this.closeReasons.REMOVE) {
                    this.onRemove.emit(data);
                }
            })
            .catch(_ => {});
    }
}
