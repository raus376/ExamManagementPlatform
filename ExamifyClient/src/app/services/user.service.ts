import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  constructor(private http: HttpClient) {}

  ngOnInit(): void {};

  public addUser(user: any) {
   return this.http.post(`${baseUrl}/auth/register`,user)
  }

  public updateUser(user:any,role:any){
    return this.http.put(`${baseUrl}/user/update/${role}`,user)
  }

  public getUser(id:any){
  return this.http.get(`${baseUrl}/user/getUserById/${id}`);
  }
}
