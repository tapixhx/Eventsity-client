import { Component } from '@angular/core';
import { DiscoverService } from './discover/discover.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DiscoverService]
})
export class AppComponent {
  title = 'Eventsity';
}
