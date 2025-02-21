import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: false,
})
export class UserListComponent {
  @Input() set users(value: User[] | null) {
    if (value) {
      this.dataSource = new MatTableDataSource<User>(value);
    }
  }
  @Input() loading: boolean | null = false;
  @Input() totalUsers = 0;
  @Input() pageSize = 10;

  @Output() onView = new EventEmitter<User>();
  @Output() onEdit = new EventEmitter<User>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onPageChange = new EventEmitter<PageEvent>();

  displayedColumns: string[] = ['username', 'email', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<User>([]);

  
  handlePageEvent(event: PageEvent): void {
    this.onPageChange.emit(event);
  }

  ngAfterViewInit() {
    console.log(this.totalUsers, 'totalUsers');
    
    this.dataSource.paginator = this.paginator;
  }

  
}
