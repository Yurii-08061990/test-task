import { createReducer, on } from '@ngrx/store';
import { User } from './user';
import { deleteUserAPISuccess, saveNewUserAPISucess, updateUserAPISucess, UsersFetchAPISuccess } from './user.action';

export const initialState: ReadonlyArray<User> = [];

export const userReducer = createReducer(
  initialState,
  on(UsersFetchAPISuccess, (state, { allUsers }) => {
    return allUsers;
  }),
  on(saveNewUserAPISucess, (state, { newUser }) => {
    let newState = [...state];
    newState.unshift(newUser);
    return newState;
  }),
  on(updateUserAPISucess, (state, { updateUser }) => {
    let newState = state.filter((user) => user.id != updateUser.id);
    newState.unshift(updateUser);
    return newState;
  }),
  on(deleteUserAPISuccess, (state, { id }) => {
    let newState =state.filter((user) => user.id != id);
    return newState;
  })
);