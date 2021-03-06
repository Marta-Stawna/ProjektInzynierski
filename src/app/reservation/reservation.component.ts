import { Component, OnInit} from '@angular/core';
import { CommunicationService } from "app/common/communication.service";
import { LoginService } from "app/common/login.service";
import { Injectable } from '@angular/core';
import { Http, Response} from "@angular/http";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  private data;
  private dataFind;
  public reservation;
  public rooms;
  private userId;
  private sessionId;
  private reservationData;
  public info;
  public groupName;
  private first_name;
  private last_name;

  constructor(private communicationService: CommunicationService, private userService: LoginService) { }

  save(data) {
  this.reservation = data;
  this.communicationService.addReservationData(this.userService.getSessionId(), this.reservation, sessionStorage.getItem('userId'), this.first_name, this.last_name)
      .subscribe(reservation => {
        this.data = reservation;
        this.info = {
          status: true,
          data: ['Potwierdzenie: ','Zatwierdzono rezerwację.']
        }
      },
      error => this.info = {
        status: false,
        data: ['Sala w powyższym terminie została już wcześniej zarezerwowana: ',
      'Proszę wybrać inną salę lub wolny termin.']
    });
  }

  ngOnInit() {
    const sessionId = this.userService.getSessionId();
    this.communicationService.getRooms(sessionId).subscribe(rooms => this.rooms = rooms);

    this.userService.getUserData(sessionId).subscribe(data => {
      this.first_name = data.first_name;
      this.last_name = data.last_name;
    });
  }
}
