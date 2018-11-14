import { NgModule } from '@angular/core';
import {
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MatTabsModule,
        MatToolbarModule,

        BrowserAnimationsModule
        // NoopAnimationsModule
    ],
    exports: [
        MatTabsModule,
        MatToolbarModule
    ]
})
export class MaterialModule { }