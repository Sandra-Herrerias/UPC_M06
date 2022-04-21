import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  constructor(private http: HttpClient) {
    // this.getData();
  }

  getData() {
    return this.http.get("http://localhost:3000/getUsers",
      {
        responseType: "json"
      });
  }

}
