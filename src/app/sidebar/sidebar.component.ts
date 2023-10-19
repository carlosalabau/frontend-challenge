import { Component, Input, OnInit } from '@angular/core';
import { selectIsOpenSidebar } from '../store/selectors';
import { Store } from '@ngrx/store';
import { updateSidebarState } from '../store/actions/loader.actions';
import { selectSelectedTrend } from '../trends/store/selectors';
import { Trend } from '../trends/models/trend.model';
import { FormGroup, FormControl } from '@angular/forms';
import { TrendService } from '../trends/trend.service';
@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar" *ngIf="isOpenSidebar$ | async">
      <article>
        <header>
          <div class="title_sidebar">
            <h3 *ngIf="selectedTrend$; else newTrendBlock">Editar noticia</h3>
            <ng-template #newTrendBlock>Nueva noticia</ng-template>
          </div>
          <div class="buttons_sidebar">
            <button
              type="button"
              (click)="closeSidebar()"
              class="close_sidebar_btn"
            >
              Cancelar
            </button>
            <button type="button" class="save_trend_btn" (click)="saveTrend()">
              Guardar
            </button>
          </div>
        </header>
        <form [formGroup]="editTrendForm">
          <div class="field">
            <label for="url">URL</label>
            <input type="text" formControlName="url" />
          </div>
          <div class="field">
            <label for="url">Autor</label>
            <input type="text" />
          </div>
          <div class="field">
            <label for="url">Titulo</label>
            <input type="text" formControlName="title" />
          </div>
          <div class="field">
            <label for="url">Contenido</label>
            <textarea rows="30" type="text" formControlName="body"></textarea>
          </div>
        </form>
      </article>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private store: Store, private trendService: TrendService) {}

  isOpenSidebar$ = this.store.select(selectIsOpenSidebar);
  selectedTrend$ = this.store.select(selectSelectedTrend);
  public editTrendForm: FormGroup = new FormGroup({});
  private idTrend!: string;
  ngOnInit(): void {
    this.selectedTrend$.subscribe((trend) => {
      if (trend) {
        this.idTrend = trend.id;
        this.editTrendForm = new FormGroup({
          url: new FormControl(trend.url),
          title: new FormControl(trend.title),
          body: new FormControl(trend.body.toString()),
        });
      }
    });
  }

  closeSidebar(): void {
    this.store.dispatch(updateSidebarState({ isOpenSidebar: false }));
  }

  saveTrend() {
    this.trendService
      .editTrend(this.idTrend, this.editTrendForm.value)
      .subscribe((val) => {
        console.log(val);
        this.closeSidebar();
      });
  }
}
