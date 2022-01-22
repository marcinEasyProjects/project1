import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import * as Translations from '../../../assets/translations/pl.json';

@Component({
    selector: 'app-input-message',
    templateUrl: './input-message.component.html',
    styleUrls: ['./input-message.component.scss']
})
export class InputMessageComponent implements OnInit {

    @Input() control!: AbstractControl;

    readonly translations = Translations;

    constructor() { }

    ngOnInit(): void { }
}
