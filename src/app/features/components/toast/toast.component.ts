import { Component, OnInit } from '@angular/core';
import { ToastService } from './services/toast.service';

export interface blockToast {
  message?: string;
  duration?: number;
  type?: string;
}
@Component({
  selector: 'app-toast',
  template: `
    <div
      class="toast"
      [ngClass]="{
        success: toast.type === 'success',
        error: toast.type === 'error'
      }"
    >
      <div class="message">{{ toast.message }}</div>
    </div>
  `,
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  toast: blockToast = {};

  constructor(private toastService: ToastService) {}
  ngOnInit(): void {
    this.toastService.toast$.subscribe((value: blockToast) => {
      this.toast = value;
    });
  }
}
