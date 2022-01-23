import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { mockedGradeItems } from './mocks';

@Injectable({
    providedIn: 'root'
})
export class GradeService {

    private mockedItems: Array<string> = mockedGradeItems;

    constructor() { }

    getGradeItems(): Observable<Array<string>> {
        return of(this.mockedItems).pipe(delay(500));
    }
}
