import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { AffichageBossComponent } from './affichage-boss/affichage-boss.component';

import { FilterPipe } from './common/pipe/string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AffichageBossComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
