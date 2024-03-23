import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UserInterfaceResponse} from "../models/interfaces/user.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _http = inject(HttpClient)
  private url: string = "https://jsonplaceholder.typicode.com/users"
   getUsers(): Observable<UserInterfaceResponse[]> {
    return this._http.get<UserInterfaceResponse[]>(this.url)
  }
}
