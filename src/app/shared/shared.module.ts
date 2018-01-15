import { NgModule } from '@angular/core';
import {
  MatRippleModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatTabsModule,
} from '@angular/material';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FooterComponent } from './components/footer/footer.component';

const modules = [
  MatRippleModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatTabsModule,
];

@NgModule({
  imports: [...modules],
  declarations: [ClickOutsideDirective, FooterComponent],
  exports: [...modules, ClickOutsideDirective, FooterComponent],
})
export class SharedModule {}
