import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppLayoutModule } from '../layout';
import { MenuLargeComponent } from './menu-large/menu-large.component';
import { MenuMediumComponent } from './menu-medium/menu-medium.component';
import { MenuSmallComponent } from './menu-small/menu-small.component';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [MenuSmallComponent, MenuMediumComponent, MenuLargeComponent],
  imports: [CommonModule, AppLayoutModule, AppRoutingModule],
  exports: [MenuSmallComponent, MenuMediumComponent, MenuLargeComponent],
})
export class AppMenuModule {}
