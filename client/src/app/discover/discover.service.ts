import { EventEmitter, Injectable } from '@angular/core';

import { Discover } from './discover.model';
import { Subject } from 'rxjs';

@Injectable()
export class DiscoverService {
    discoverChanged = new Subject<Discover[]>();
    eventSelected = new EventEmitter<Discover>();
    eventid:number;

    constructor() {}
    name:string;
    discover : Discover[];

    setDiscover(discovers: Discover[]) {
        console.log(discovers);
        this.discover = discovers;
        this.discoverChanged.next(this.discover);
    }

    eventId(id:number) {
        this.eventid = id;
        console.log(this.eventid);
    }

    setMyEvents(discovers: Discover[]) {
        console.log(discovers);
        return this.discover = discovers;
        // this.discoverChanged.next(this.discover);
    }

    getEvents() { //sending copy of array to list
        return this.discover.slice();
    }

    getEvent(index:number) { //sending details of the event in array
        return this.discover[index];
    }

}