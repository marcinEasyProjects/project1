import { AbstractControl, FormGroup } from "@angular/forms";

export interface AddEditForm extends FormGroup {
    value: DiaryItemForForm;

    controls: {
        username: AbstractControl;
        password: AbstractControl;
    };
}

interface DiaryItemForForm {
    name: string;
    surname: string;
    grade: string;
    rating: number;
}