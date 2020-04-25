import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropDownDirective } from './dropdown.directive';


@NgModule({
    declarations: [
        DropDownDirective
    ],
    exports: [
        CommonModule,
        DropDownDirective
    ]
})
export class SharedModule {}