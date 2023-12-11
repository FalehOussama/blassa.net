import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesNotesPageRoutingModule } from './mes-notes-routing.module';

import { MesNotesPage } from './mes-notes.page';
import { SharedModule } from '../../components/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesNotesPageRoutingModule,
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [MesNotesPage]
})
export class MesNotesPageModule {}
