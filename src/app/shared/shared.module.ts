import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMessageModule } from './modules/alert-message/alert-message.module';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ContentDialogComponent } from './components/content-dialog/content-dialog.component';
import { ValidatorsModule } from './modules/validators/validators.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { UiControlsModule } from './modules/ui-controls/ui-controls.module';

import { InterceptorService } from './services/interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseComponent } from './components/base-component';
import { SafePipe } from './pipes/safe.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NumberDirective } from '../shared/directives/numbers-only.directive';


@NgModule({
  declarations: [
    AlertDialogComponent,
    ContentDialogComponent,
    ConfirmDialogComponent,
    BaseComponent,
    NumberDirective,
    SafePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertMessageModule,
    ValidatorsModule,
    HttpClientModule,
    AppMaterialModule,
    UiControlsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    }
    ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AlertMessageModule,
    AlertDialogComponent,
    BaseComponent,
    AppMaterialModule,
    ContentDialogComponent,
    ConfirmDialogComponent,
    ValidatorsModule,
    HttpClientModule,
    SafePipe,
    NumberDirective,
    UiControlsModule
  ],
})
export class SharedModule {}
