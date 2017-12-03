import { Injectable } from '@angular/core';
import { Http, Response} from "@angular/http";
import { Observable } from "rxjs/Observable";
import {Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class CommunicationService {

  public reservation;
  headers: {
    name: string;
    value: string;
  }[]

  constructor(private http: Http) {
    this.headers = [
    { name: 'Cache-Controlr', value: 'no-cache, no-store, must-revalidate'},
    { name: 'Pragma', value: 'no-cache'},
    { name: 'Expires', value: '0'},
    { name: 'Access-Control-Allow-Origin', value: '*'}];
  }

  getRooms(sessionid) {
    return this.http.get('https://dev.alcon.eu.org/ugather/' + sessionid + '&fields=id|number|building_id|building_name|type|capacity&services=x_extend/room_scan',
    this.headers )
    .map((res: Response) => res.json().data)
  }

  getPlan(sessionid, idRoom) {
    let url = 'https://dev.alcon.eu.org/ugather/' + sessionid + '&fields=start_time%7Cend_time%7Cname&services=tt%2Froom&rest=room_id%3D' + idRoom +'%26';

    return this.http.get( url)
    .map((res: Response) => res.json().data)
 }

  getUserId(sessionid) {
    return this.http.get('https://dev.alcon.eu.org/ugather/' + sessionid, this.headers)
    .map((res: Response) => res.json().data.id)
  }

  getReservationData(sessionid, userId) {
    return this.http.get('http://213.184.22.45/querydb.php?id_u=' + userId,  this.headers)
    .map((res: Response) => res.json().data)
  }

  addReservationData(sessionid, reservation, userId) {
    let sendReservation = 'dane={"collection":"rezerwacje", "mode":"insert", "dane":{ "id_u":"' + userId + '","sala":"' + reservation.sala + '","data":"' + reservation.date + '","godzina":"' + reservation.godzina.substring(0,5) + '"}}';

    return this.http.get('http://213.184.22.45/querydb.php?'+ sendReservation, this.headers)
    .map((res: Response) => {console.log(res, 'reservation') ;res.json().data})
  }

  findReservationData(reservation, userId) {
    let findReservation = 'dane={"collection":"rezerwacje", "mode":"find", "dane":{ "sala":"' + reservation.sala + '","data":"' + reservation.date + '","godzina":"' + reservation.godzina.substring(0,5) + '"}}';

    return this.http.get('http://213.184.22.45/querydb.php?' + findReservation, this.headers)
    .map((res: Response) => {
     let data = res.json().data;

     return Object.keys(data).length;
    });
  }

  checkRoomData(data){
    //{"pojemnosc" : "48", "usos_id" : "42", "sala" : "A2-21", "projektor": "1", "poziom" : "2", "komputery" : "0"},
    // var checkRoomData = 'dane={"collection":"sale", "mode":"find", "dane":{ "sala":"' + data.sala + '","data":"' + data.date + '","godzina":"' + data.godzina.substring(0,5) + '"}}';
   let projector,
       labs,
       checkRoomData;

    if (data.projector == true) {
      projector = 1
    } else{
      projector = 0
    }
    if(data.labs == true){
      labs = 1
    } else {
      labs = 0
    }
    if (data.location == "") {
      console.log("Brak inf o miejscach")
      checkRoomData = 'dane={"collection":"sale", "mode":"find", "dane":{ "projektor": "' + projector + '" , "komputery" : "'+ labs +'" }}';
    } else {
      checkRoomData = 'dane={"collection":"sale", "mode":"find", "dane":{ "poziom" : "'+ data.location +'" , "projektor": "' + projector + '" , "komputery" : "'+ labs +'" }}';
    }
    // "pojemnosc" : "48" ,
    return this.http.get('http://213.184.22.45/querydb.php?' + checkRoomData, this.headers)
    .map((res: Response) => res.json().data)
  }

  removeReservationData(sessionid, reservation, userId) {
    let removeReservation = 'dane={"collection":"rezerwacje", "mode":"remove", "dane":{ "id_u":"'+ userId + '","sala":"'+ reservation.sala + '","data":"'+ reservation.data + '","godzina":"' + reservation.godzina +'"}}';

    return this.http.get('http://213.184.22.45/querydb.php?' + removeReservation, this.headers)
    .map((res: Response) => res.json().data);
  }
}
