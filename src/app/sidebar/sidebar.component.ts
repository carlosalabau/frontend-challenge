import { Component, Input, OnInit } from '@angular/core';
import { selectIsOpenSidebar } from '../store/selectors';
import { Store } from '@ngrx/store';
import { updateSidebarState } from '../store/actions/loader.actions';
import { selectSelectedTrend } from '../trends/store/selectors';
import { Trend } from '../trends/models/trend.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrendService } from '../trends/trend.service';
import { loadTrends } from '../trends/store/actions/trends-list-page.actions';
import { Router } from '@angular/router';
import { ToastService } from '../components/toast/services/toast.service';
@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar" *ngIf="isOpenSidebar$ | async">
      <article>
        <header>
          <div class="title_sidebar">
            <h3 *ngIf="idTrend; else newTrendBlock">Editar noticia</h3>
            <ng-template #newTrendBlock><h3>Nueva noticia</h3></ng-template>
          </div>
          <div class="buttons_sidebar">
            <button
              type="button"
              (click)="closeSidebar()"
              class="close_sidebar_btn"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="save_trend_btn"
              (click)="idTrend ? editTrend() : addNewTrend()"
            >
              Guardar
            </button>
          </div>
        </header>
        <form [formGroup]="trendForm">
          <div class="field">
            <label for="url">URL *</label>
            <input type="text" formControlName="url" />
          </div>
          <div class="field">
            <label for="url">Autor *</label>
            <select formControlName="provider" id="provider">
              <option value="elmundo">El mundo</option>
              <option value="elpais">El pais</option>
            </select>
          </div>
          <div class="field">
            <label for="url">Titulo *</label>
            <input type="text" formControlName="title" />
          </div>
          <div class="field">
            <label for="url">Imagen *</label>
            <input type="text" formControlName="image" />
          </div>
          <div class="field">
            <label for="url">Contenido *</label>
            <textarea rows="20" type="text" formControlName="body"></textarea>
          </div>
        </form>
      </article>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private store: Store,
    private trendService: TrendService,
    private router: Router,
    private toastService: ToastService
  ) {}
  @Input() set trendDetail(value: Trend) {
    this.idTrend = value?.id || '';
    this.trendForm = new FormGroup({
      url: new FormControl(value?.url || '', Validators.required),
      title: new FormControl(value?.title || '', Validators.required),
      body: new FormControl(value?.body.toString() || '', Validators.required),
      image: new FormControl(value?.image || '', Validators.required),
      provider: new FormControl(value?.provider || '', Validators.required),
    });
  }

  isOpenSidebar$ = this.store.select(selectIsOpenSidebar);
  selectedTrend$ = this.store.select(selectSelectedTrend);
  public trendForm: FormGroup = new FormGroup({});
  public idTrend!: string;
  ngOnInit(): void {}

  closeSidebar(): void {
    this.store.dispatch(updateSidebarState({ isOpenSidebar: false }));
  }

  editTrend() {
    if (this.trendForm.valid) {
      this.trendService
        .editTrend(this.idTrend, this.trendForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['trends']);
            this.closeSidebar();
            this.notifySuccess('Noticia actualizada con exito');
          },
          error: (err) => {
            this.notifyError(
              `Ha ocurrido un error: ${JSON.stringify(err.message)}`
            );
          },
        });
    } else {
      this.notifyError(`Revisa los campos obligatorios`);
    }
  }

  addNewTrend() {
    if (this.trendForm.valid) {
      this.trendService.createTrend(this.trendForm.value).subscribe({
        next: () => {
          this.closeSidebar();
          this.store.dispatch(loadTrends());
          this.notifySuccess('Noticia creada con exito');
        },
        error: (err) => {
          this.notifyError(
            `Ha ocurrido un error: ${JSON.stringify(err.message)}`
          );
        },
      });
    } else {
      this.notifyError(`Revisa los campos obligatorios`);
    }
  }

  notifyError(message: string) {
    this.toastService.showToast(`${message}`, 3000, 'error');
  }

  notifySuccess(message: string) {
    this.toastService.showToast(`${message}`, 3000, 'success');
  }
}
