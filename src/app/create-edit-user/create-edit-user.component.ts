import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../services/modal-service.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {UserInterface} from "../models/interfaces/user.interface";


@Component({
  selector: 'create-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css'
})
export class CreateEditUser implements OnInit{
  modalService = inject(ModalService)
  isEdit = false
  fb = inject(FormBuilder)
  @Input() data?: UserInterface
  @Output() createUserEmit = new EventEmitter()
  @Output() editUserEmit = new EventEmitter()
  constructor() {}
  fbForm = this.fb.group({
    id: 0,
    email: [""],
    name: [""],
    phone: [""],
    website: [""],
    username:[""]
  })

  closeDialog() {
    this.modalService.toggleDialog(false)
  }

  createUser() {
    this.modalService.data$.next(this.fbForm.value as UserInterface)
    this.createUserEmit.emit()
  }
  editUser() {
    this.editUserEmit.emit(this.fbForm.value)
    this.modalService.toggleDialog(false)
  }
  ngOnInit(): void {
    this.data?.id ? this.isEdit = true : this.isEdit = false
    this.data && this.fbForm.patchValue(this.data)
  }

}
