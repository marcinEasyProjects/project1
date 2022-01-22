import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiaryItem } from 'src/app/services/data-structures/diary';
import * as Translations from '../../../assets/translations/pl.json';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    @Input() items: DiaryItem[] = [];
    @Output() onEdit = new EventEmitter<DiaryItem>();
    @Output() onRemove = new EventEmitter<DiaryItem>();

    readonly translations = Translations;

    constructor() { }

    ngOnInit(): void {
    }

    edit(item: DiaryItem): void {
        this.onEdit.emit(item);
    }

    remove(item: DiaryItem): void {
        this.onRemove.emit(item);
    }
}
