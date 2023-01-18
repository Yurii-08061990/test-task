import { createAction, props } from "@ngrx/store";
import { User } from "./user";


export const invokeUsersAPI = createAction(
	'[User API] Invoke User Fetch API'
);

export const UsersFetchAPISuccess = createAction(
	'[User API] Fetch API Success',
	props<{ allUsers: User[] }>()
);

export const invokeSaveNewUserAPI = createAction(
	'[User API] Inovke save new user api',
	props<{ newUser: User }>()
);

export const saveNewUserAPISucess = createAction(
	'[User API] save new user api success',
	props<{ newUser: User }>()
);

export const invokeUpdateUserAPI = createAction(
	'[User API] Inovke update user api',
	props<{ updateUser: User }>()
);

export const updateUserAPISucess = createAction(
	'[User API] update user api success',
	props<{ updateUser: User }>()
);

export const invokeDeleteUserAPI = createAction(
	'[User API] Inovke delete user api',
	props<{ id: string }>()
);

export const deleteUserAPISuccess = createAction(
	'[User API] deleted user api success',
	props<{ id: string }>()
);