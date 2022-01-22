import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { DiaryItem } from './data-structures/diary';
import { mockedItems } from './mocks';

@Injectable({
    providedIn: 'root'
})
export class DiaryService {

    private mockedItems: DiaryItem[] = mockedItems;

    constructor() { }

    getDiaryItems(): Observable<DiaryItem[]> {
        return of(this.mockedItems).pipe(delay(500));
    }

    addDiaryItem(item: DiaryItem): Observable<boolean> {
        return of(true).pipe(
            delay(1000),
            tap((_) => {
                this.mockedItems.push(item);
            })
        );
    }

    editDiaryItem(item: DiaryItem): Observable<boolean> {
        return of(true).pipe(
            delay(500),
            tap((_) => {
                const indexOfItemInArray = this.mockedItems.findIndex(x => x.id === item.id);

                if(indexOfItemInArray) {
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
