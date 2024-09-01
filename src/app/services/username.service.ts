import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUserName(data: User) {
    const url = "http://localhost/restapi/api.php";
    return this.http.post(url, data, this.httpOptions).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
