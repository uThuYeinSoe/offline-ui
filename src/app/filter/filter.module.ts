import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponentComponent } from './filter-component/filter-component.component';

@NgModule({
  declarations: [FilterComponentComponent],
  imports: [CommonModule],
  exports: [FilterComponentComponent],
})
export class FilterModule {}
