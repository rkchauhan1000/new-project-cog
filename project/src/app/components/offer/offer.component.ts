import { VariableBinding } from '@angular/compiler';
import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() discount : any;
  @Input() price : any;
  @Input() startDate : any;
  @Input() endDate : any;

}
