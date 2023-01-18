import { selectUsers } from './user.selector';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { Appstate } from "src/app/shared/store/appstate";
import { UsersService } from "../users/users.service";
import { deleteUserAPISuccess, invokeDeleteUserAPI, invokeSaveNewUserAPI, invokeUpdateUserAPI, invokeUsersAPI, saveNewUserAPISucess, updateUserAPISucess, UsersFetchAPISuccess } from "./user.action";
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { User } from './user';
import { setAPIStatus } from '../../shared/store/app.action';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private usersSrv: UsersService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUsersAPI),
      withLatestFrom(this.store.pipe(select(selectUsers))),
      mergeMap(([, userformStore]) => {
        if (userformStore.length > 0) {
          return EMPTY;
        }
        return this.usersSrv
          .getUsers()
          .pipe(map((data) => UsersFetchAPISuccess({ allUsers: data })));
      })
    ),
  );

  saveNewUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewUserAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.usersSrv.createUser(action.newUser).pipe(
          map((data: User) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewUserAPISucess({ newUser: data });
          })
        );
      })
    );
  });

  updateUserAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateUserAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.usersSrv.updateUser(action.updateUser).pipe(
          map((data: User) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateUserAPISucess({ updateUser: data });
          })
        );
      })
    );
  });

  deleteUsersAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteUserAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.usersSrv.deleteUser(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteUserAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
