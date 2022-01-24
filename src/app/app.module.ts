import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GnomesListComponent } from './components/gnomes-list/gnomes-list.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './components/detail/detail.component';
import { TeamComponent } from './components/team/team.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GnomesListComponent,
    SearchComponent,
    DetailComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
