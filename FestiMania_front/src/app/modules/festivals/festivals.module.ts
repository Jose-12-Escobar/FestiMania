import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';

import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { FestivalsRoutingModule } from './festivals-routing.module';
import { NewFestinavalComponent } from './component/new-festinaval/new-festinaval.component';
import { PageHomeMenuComponent } from './component/page-home-menu/page-home-menu.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IsoDateLocalPipe } from './pipes/IsoDataLocalPipe';
import { ListFestivalComponent } from './component/list-festival/list-festival.component';
import { AddSubArtistFestivalComponent } from './component/add-sub-artist-festival/add-sub-artist-festival.component';
import { DetailsFestivalComponent } from './component/details-festival/details-festival.component';


@NgModule({
  declarations: [
    NewFestinavalComponent,
    PageHomeMenuComponent,
    IsoDateLocalPipe,
    ListFestivalComponent,
    DetailsFestivalComponent,
    AddSubArtistFestivalComponent
  ],
  imports: [
    CommonModule,
    FestivalsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    CardModule,
    CommonModule,
    TableModule,
    CardModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    RadioButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    TooltipModule,
    ToastModule,
    InputMaskModule,
    ConfirmDialogModule,
    InputTextareaModule,
    MultiSelectModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    IsoDateLocalPipe],
})
export class FestivalsModule { }
