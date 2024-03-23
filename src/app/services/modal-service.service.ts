import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserInterface} from "../models/interfaces/user.interface";


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  open$ = new BehaviorSubject(false)
  data$ = new BehaviorSubject<UserInterface>({
    id: 10,
    website: "",
    phone:"",
    name:"",
    email:''
  })
  toggleDialog(value: boolean) {
    this.open$.next(value)
  }
}
