import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";
import {UserInterface, UserInterfaceResponse} from "../models/interfaces/user.interface";
import {ApiService} from "./api-service.service";
import {UsersDTOAdapter} from "../utils/usersDTOAdapter";
import {ModalService} from "./modal-service.service";
import {LocalStorageService} from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiService = inject(ApiService)
  private modalService = inject(ModalService)
  localStorageService = inject(LocalStorageService)
  private _users$ = new BehaviorSubject<UserInterface[]>([]);
  localStorageUsers$ = this._users$.asObservable()


  getUsers$: Observable<UserInterface[]>  = this.apiService.getUsers().pipe(
    tap((usersResponse:UserInterfaceResponse[])=>{
      const entityUsers: UserInterface[] = usersResponse.map((data: UserInterfaceResponse) => UsersDTOAdapter.DTOtoEntity(data))
      this._users$.next(entityUsers);
      this.localStorageService.setItem('users', JSON.stringify(entityUsers))
    }),
    switchMap(() =>  this._users$)
  );
  getLocalStorageUsers(){
    this._users$.next(JSON.parse(<string>this.localStorageService.getItem('users')))
  }
  removeUser(id: number) {
    this._users$.next(this._users$.value.filter(el => el.id !== id))
    this.localStorageService.setItem('users', JSON.stringify(this._users$.value) )
  }
  addUser() {
    const newUser = {...this.modalService.data$.value, id:this._users$.value.length +1 }
    this._users$.next([...this._users$.value, newUser  ])
    this.localStorageService.setItem('users', JSON.stringify(this._users$.value) )
  }
  editUser(currentUser: UserInterface) {
    this._users$.next(this._users$.value.map((el:UserInterface) => el.id === currentUser.id ? {...el, ...currentUser  } : el))
    this.localStorageService.setItem('users', JSON.stringify(this._users$.value) )
  }
}
