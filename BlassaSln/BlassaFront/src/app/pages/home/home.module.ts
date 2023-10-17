import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/components/shared.module';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { ParralaxHeaderDirective } from 'src/app/directives/parralax-header.directive';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    SharedDirectivesModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
