import { User } from './user';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectUsers = createFeatureSelector<User[]>('users');

export const selectUserById = (userId: string) =>
  createSelector(selectUsers, (users: User[]) => {
    let userbyId = users.filter((_) => _.id == userId);
    if (userbyId.length == 0) {
      return null;
    }
    return userbyId[0];
  });