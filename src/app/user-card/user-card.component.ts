import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserInterface} from "../models/interfaces/user.interface";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: UserInterface
  @Output() delEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<UserInterface>();
  delUser(id: number) {
    this.delEvent.emit(id)
  }

  editUser(user: UserInterface) {
    this.editEvent.emit(user)
  }
}

