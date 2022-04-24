import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  constructor(private http: HttpClient) {
    // this.getData();
  }

  getData() {
    return this.http.get("http://localhost:3000/getComments",
      {
        responseType: "json"
      });
  }

  addUser(user: User) {
    return this.http.post("http://localhost:3000/addUser",
      {
        responseType: "json",
        params: { username: user.username, email: user.email, password: user.password }
      });
  }

}
