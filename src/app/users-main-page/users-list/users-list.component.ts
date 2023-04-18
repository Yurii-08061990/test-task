import { ModalComponent } from './../modal/modal.component';
import { UsersService } from './../users/users.service';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeDeleteUserAPI, invokeUsersAPI } from '../store/user.action';
import { selectUsers } from '../store/user.selector';
import { User } from '../store/user';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'age', 'country', 'action'];

  constructor(
    private store: Store,
    private router: Router,
    private userSrv: UsersService,
    private appStore: Store<Appstate>,
    private dialog: MatDialog,
    ) { }

  users$ = this.store.pipe(select(selectUsers));

  ngOnInit(): void {
    this.store.dispatch(invokeUsersAPI());
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(
          invokeDeleteUserAPI({
            id: id,
          })
        );
        let apiStatus$ = this.appStore.pipe(select(selectAppState));
        apiStatus$.subscribe((apState) => {
          if (apState.apiStatus == 'success') {
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            );
          }
        });
      }
    });
    
  }

  addEditUser(user: User | null) {
    this.userSrv.selectUser = user;
    this.router.navigate(['/add-user']);
  }
}
