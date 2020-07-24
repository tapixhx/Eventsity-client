import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appConfirmPassword]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting: ConfrimPasswordDirective,
        multi:true
    }]
})
export class ConfrimPasswordDirective implements Validator {
    @Input() appConfirmPassword:string;
    validate(control:AbstractControl) : {[key:string]:any} | null{
        const controlToCompare = control.parent.get(this.appConfirmPassword);
        if(controlToCompare && controlToCompare.value !== control.value) {
            return{'notEqual':true};
        }
        return null;
    }
    constructor() {}
}