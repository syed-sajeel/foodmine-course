import { USER_LOGIN_URL } from './../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { User } from './../shared/models/User';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, pipe, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../shared/interfaces/IUserLogin';

const USER_KEY='User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject= new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient) {
    this.userObservable=this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin)
    .pipe(tap({
      next:(user)=>{
       this.setUserToLocalStorage(user);
      },
      error:(errorResponse)=>{
                
      }
    }))
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson=localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User(); 
  }


}
