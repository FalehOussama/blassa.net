import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesNotesConduitePageRoutingModule } from './mes-notes-conduite-routing.module';

import { MesNotesConduitePage } from './mes-notes-conduite.page';
import { SharedModule } from '../../components/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesNotesConduitePageRoutingModule,
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [MesNotesConduitePage]
})
export class MesNotesConduitePageModule {}
