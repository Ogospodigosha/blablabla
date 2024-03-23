import {Component, inject, OnInit} from '@angular/core';
import { UsersService} from "../services/users-api.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";
import {ModalService} from "../services/modal-service.service";
import {CreateEditUser} from "../create-edit-user/create-edit-user.component";
import {UserInterface} from "../models/interfaces/user.interface";
import {LocalStorageService} from "../services/local-storage.service";
import {Observable, of, tap} from "rxjs";


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    UserCardComponent,
    CreateEditUser,

  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements  OnInit {
  usersService = inject(UsersService)
  modalService = inject(ModalService)
  localStorageService = inject(LocalStorageService)
  editableUser = {} as UserInterface
  users$: Observable<UserInterface[]> = new Observable<UserInterface[]>();

  constructor() {

  }

  delUser(id: number) {
    this.usersService.removeUser(id)
  }

  openModal() {
    this.modalService.toggleDialog(true)
    this.editableUser = {
      id: 0,
      name: '',
      email: '',
      website: '',
      phone: ''
    }
  }

  createUser() {
    this.usersService.addUser()
    this.modalService.toggleDialog(false)
  }

  editUser(user: UserInterface) {
    this.modalService.toggleDialog(true)
    this.editableUser = user
    this.usersService.editUser(this.editableUser)
  }

  ngOnInit(): void {
    let localStorageUsers = this.localStorageService.getItem('users')!== null
      ? JSON.parse(<string>this.localStorageService.getItem('users'))
      : null
    if ( localStorageUsers !== null) {
      this.users$ = this.usersService.localStorageUsers$
      this.usersService.getLocalStorageUsers()
    } else {
      this.users$ = this.usersService.getUsers$
    }
  }
}
