import { Component, Input} from '@angular/core';
import { IUser } from '../../../../backend/src/entity/IUser'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  @Input() users: IUser[] = [];
}
