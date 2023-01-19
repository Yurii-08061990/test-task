import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AddUserComponent } from './add-user/add-user.component';
import { UserEffect } from './store/user.effect';
import { userReducer } from './store/user.reducer';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersMainPageRoutingModule } from './users-main-page-routing.module';
import { UsersMainPageComponent } from './users-main-page.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    UsersMainPageComponent,
    UsersListComponent,
    AddUserComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersMainPageRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffect]),
  ],
  exports: [
    UsersMainPageComponent,
    UsersListComponent,
    AddUserComponent,
  ],
})
export class UsersMainPageModule { }
