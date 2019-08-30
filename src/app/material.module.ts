import { NgModule } from '@angular/core';
import  {   MatButtonModule,
            MatInputModule,
            MatTableModule,
            MatTabsModule,
            MatToolbarModule,
            MatMenuModule,
            MatIconModule,
            MatCheckboxModule,
            MatFormFieldModule,
            MatGridListModule,
            MatRadioModule,
            MatSelectModule,
            MatDatepickerModule,
            MatCardModule,
            MatTooltipModule
 
            // MatPaginator
        } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatGridListModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatCardModule,
        MatTooltipModule        // MatPaginator
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatGridListModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatCardModule,
        MatTooltipModule
        // MatPaginator
    ],
  })
export class MaterialModule { }
