import { invokeUpdateUserAPI } from './../store/user.action';
import { UsersService } from './../users/users.service';
import { User } from './../store/user';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeSaveNewUserAPI } from '../store/user.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private userSrv: UsersService,
  ) {}
 
  userForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
  });

  isUser: boolean = false;
 
  ngOnInit(): void {
    if (this.userSrv.selectUser) {
      this.userForm.setValue(this.userSrv.selectUser);
      this.isUser = true;
    } else {
      this.isUser = false;
    }
  }

  cancel() {
    this.router.navigate(['/']);
    this.userSrv.selectUser = null;
  }
 
  save(form: FormGroup) {
    if (!this.userSrv.selectUser) {
      form.value.id = crypto.randomUUID();
      this.store.dispatch(invokeSaveNewUserAPI({ newUser: form.value }));
    }
    this.store.dispatch(invokeUpdateUserAPI({ updateUser: form.value }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
         this.router.navigate(['/']);
         this.userSrv.selectUser = null;
      }
    });
  }
}
