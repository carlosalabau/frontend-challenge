import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { blockToast } from '../toast.component';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject: BehaviorSubject<blockToast> =
    new BehaviorSubject<blockToast>({});
  public toast$: Observable<blockToast> = this.toastSubject.asObservable();
  constructor() {}

  showToast(message: string, duration: number, type: string): void {
    this.toastSubject.next({
      message,
      duration,
      type,
    });
    setTimeout(() => {
      this.clearMessage();
    }, duration);
  }
  clearMessage(): void {
    this.toastSubject.next({
      message: '',
    });
  }
}
