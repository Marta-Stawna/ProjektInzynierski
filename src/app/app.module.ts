import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationComponent } from './reservation/reservation.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';
import { LoginComponent } from './login/login.component';
import { appRoutes } from './app-routing.module';
import { LoginService } from './common/login.service';
import { MdSidenavModule } from '@angular/material';
import { PopupModule } from 'ng2-opd-popup';
import { CommunicationService } from './common/communication.service';
import { TableRowComponent } from './dashboard/table/tableRow/table-row/table-row.component';
import { OrderByPipe } from './common/sort.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { AuthService} from './auth/auth.service';
import { AuthGuardService} from './auth/auth-guard.service';
import { MyGroupsComponent } from './my-groups/my-groups.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { SearchGroupComponent } from './search-group/search-group.component';
import { GroupsService } from './common/groups.service';
import { AdminComponent } from './my-groups/admin/admin.component';
import { AddToGroupComponent } from './search-group/add-to-group/add-to-group.component';
import { AdminListComponent } from './my-groups/admin-list/admin-list.component';
import { AboutComponent } from './about/about.component';
import { ReservationGroupsComponent } from './reservation-groups/reservation-groups.component';
import { MyReservationGroupComponent } from './my-reservation-group/my-reservation-group.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './common/messages.service';
import { BoxMessagesComponent } from './box-messages/box-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ReservationComponent,
    EditComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    TableRowComponent,
    OrderByPipe,
    MyGroupsComponent,
    NewGroupComponent,
    SearchGroupComponent,
    AdminComponent,
    AddToGroupComponent,
    AdminListComponent,
    AboutComponent,
    ReservationGroupsComponent,
    MyReservationGroupComponent,
    MessagesComponent,
    BoxMessagesComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    MdSidenavModule,
    Ng2OrderModule,
    PopupModule.forRoot()
  ],

  providers: [LoginService, CommunicationService, AuthService, AuthGuardService, GroupsService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
