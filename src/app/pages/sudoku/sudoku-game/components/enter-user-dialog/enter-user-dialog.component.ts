import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-enter-user-dialog',
  templateUrl: './enter-user-dialog.component.html',
  styles: [`:host {
    overflow: hidden;
}`],
})
export class EnterUserDialogComponent {
  username: string = '';

  userNameFormControl = new FormControl('', [Validators.required]);
}
