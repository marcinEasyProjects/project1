import { Injectable } from '@angular/core';
import { delay, Observable, of, tap, throwError } from 'rxjs';
import { DiaryItem } from './data-structures/diary';
import { mockedDiaryItems } from './mocks';

@Injectable({
    providedIn: 'root'
})
export class DiaryService {

    private mockedItems: DiaryItem[] = mockedDiaryItems;
    readonly NOT_FOUND = -1;

    constructor() { }

    getDiaryItems(): Observable<DiaryItem[]> {
        return of(this.mockedItems).pipe(delay(500));
    }

    addDiaryItem(item: DiaryItem): Observable<boolean> {
        return of(true).pipe(
            delay(1000),
            tap((_) => {
                const lastElement = this.mockedItems[this.mockedItems.length - 1];

                if(lastElement !== undefined) {
                    this.mockedItems.push({id: lastElement.id! + 1, ...item});
                }
                else {
                    this.mockedItems.push({id: 1, ...item});
                }
            })
        );
    }

    editDiaryItem(item: DiaryItem): Observable<boolean> {
        return of(true).pipe(
            delay(500),
            tap((_) => {
                const indexOfItemInArray = this.mockedItems.findIndex(x => x.id === item.id);

                if(indexOfItemInArray !== this.NOT_FOUND) {
                    this.mockedItems[indexOfItemInArray] = item;
                }
            })
        );
    }

    removeDiaryItem(item: DiaryItem): Observable<boolean> {
        return of(true).pipe(
            delay(500),
            tap((_) => {
                this.mockedItems = this.mockedItems.filter((x: DiaryItem) => x.id !== item.id);
            })
        );
    }
}
