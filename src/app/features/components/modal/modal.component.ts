import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal">
      <h4>{{ message }}</h4>
      <div class="buttons_modal">
        <button class="cancel" (click)="cancel()">Cancelar</button>
        <button class="confirm" (click)="confirm()">Confirmar</button>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() message!: string;
  @Output() accept: EventEmitter<void> = new EventEmitter<void>();
  @Output() reject: EventEmitter<void> = new EventEmitter<void>();

  confirm(): void {
    this.accept.emit();
  }

  cancel(): void {
    this.reject.emit();
  }
  constructor() {}

  ngOnInit(): void {}
}
