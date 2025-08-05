import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: `
    <p>
      base-form works!
    </p>
  `,
  styles: ``
})
export abstract class BaseFormComponent {
  form!: FormGroup;

  getErrors(
    control: AbstractControl, 
    displayName: string, 
    customMessages: {[key: string] : string } | null = null): string[]
  {
    let errors: string[] = [];
    Object.keys(control.errors || {}).forEach(key => {
      switch(key){
        case 'required':
          errors.push(`${displayName} ${customMessages?.[key] ?? " is required"}`);
          break;
        case 'pattern':
          errors.push(`${displayName} ${customMessages?.[key] ?? " is invalid"}`);
          break;
        case 'isDupeField':
          errors.push(`${displayName} ${customMessages ?? " already exists"}`);
          break;
        default:
          errors.push(`${displayName} ${customMessages ?? " has unknown error"}`);
          break;
      }
    });
    return errors;
  }
}
