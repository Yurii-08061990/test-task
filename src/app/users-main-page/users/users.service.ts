import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../store/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  selectUser: any;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>('http://localhost:3000/users');
  }
  createUser(payload: User) {
    return this.http.post<User>('http://localhost:3000/users', payload);
  }

  updateUser(payload: User) {
    return this.http.put<User>(
      `http://localhost:3000/users/${payload.id}`,
      payload
    );
  }

  deleteUser(id: string) {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }
}
