import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationsService {
  constructor(private readonly toastr: ToastrService) {}

  error(message: string) {
    this.toastr.error(message, 'Error');
  }

  success(title: string, message: string) {
    this.toastr.success(message, title);
  }
}
