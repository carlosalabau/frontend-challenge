import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { Trend } from '../models/trend.model';
import { TrendService } from '../trend.service';
import { loadTrends } from '../store/actions/trends-list-page.actions';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastService } from '../../components/toast/services/toast.service';
import { selectIsModalOpen } from '../../../core/store/selectors';
import {
  updateModalState,
  updateSidebarState,
} from '../../../core/store/actions/loader.actions';

@Component({
  selector: 'app-trend-detail',
  template: `
    <img
      class="add_image"
      (click)="openSidebar()"
      src="assets/Iconos/Actions/add_figma.svg"
    />
    <a class="link-to-home" routerLink="/trends">
      <img src="assets/Iconos/Actions/back.svg" alt="Flecha hacia atrás" />
      <span>TODOS LOS EVENTOS</span>
    </a>
    <article class="trend__detail" *ngIf="trend$ | async as trend">
      <header class="trend__header">
        <div class="trend__actions">
          <button
            type="button"
            class="trend__action"
            (click)="openSidebar(trend)"
          >
            <img src="assets/Iconos/Actions/edit.svg" alt="Editar noticia" />
          </button>
          <button type="button" class="trend__action" (click)="deleteTrend()">
            <img src="assets/Iconos/Actions/delete.svg" alt="Borrar noticia" />
          </button>
        </div>
        <img class="trend__image" [src]="trend.image" alt="trend.title" />
      </header>
      <div class="trend__content">
        <h2 class="trend__title">
          <a class="trend__link" [href]="trend.url" target="_blank">
            {{ trend.title }}
          </a>
        </h2>
        <div class="trend_paragraph-container">
          <p class="trend__paragraph" *ngFor="let paragraph of trend.body">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </article>
    <app-sidebar [trendDetail]="trendDetail"></app-sidebar>
    <app-modal
      *ngIf="isOpenModal$ | async"
      [message]="'¿Estás seguro de que deseas realizar esta acción?'"
      (accept)="handleConfirmation()"
      (reject)="handleCancellation()"
    >
    </app-modal>
  `,
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);
  protected isOpenModal$ = this.store.select(selectIsModalOpen);
  trendDetail!: any;
  constructor(
    private store: Store,
    private trendService: TrendService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  openSidebar(trend?: Trend): void {
    trend ? (this.trendDetail = trend) : (this.trendDetail = undefined);

    this.store.dispatch(
      updateSidebarState({
        isOpenSidebar: true,
      })
    );
  }

  handleConfirmation(): void {
    const idTrend = this.activatedRoute.snapshot.params['id'];
    this.trendService.removeTrend(idTrend).subscribe({
      next: () => {
        this.store.dispatch(updateModalState({ isOpenModal: false }));
        this.store.dispatch(loadTrends());
        this.router.navigate(['trends']);
        this.toastService.showToast(
          'Noticia eliminada con exito',
          3000,
          'success'
        );
        error: () => {
          this.toastService.showToast('Ha ocurrido un error', 3000, 'error');
        };
      },
    });
  }

  handleCancellation(): void {
    this.store.dispatch(updateModalState({ isOpenModal: false }));
  }

  deleteTrend(): void {
    this.store.dispatch(updateModalState({ isOpenModal: true }));
  }
}
