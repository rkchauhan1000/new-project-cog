import { VariableBinding } from '@angular/compiler';
import { Component, OnInit ,Input,EventEmitter,Output} from '@angular/core';
import { NgbDateStruct,NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl,FormGroup ,Validators} from '@angular/forms';
import {Offer} from "src/app/Offer";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})


export class OfferComponent implements OnInit {

  @Input()
  offer: Offer = new Offer;
  temp_offer : Offer = new Offer;

  @Output() offerDelete : EventEmitter<Offer> = new EventEmitter();
  @Output() offerModify : EventEmitter<Offer> = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  model : NgbDateStruct = this.offer.startDate;
  model1: NgbDateStruct = this.offer.endDate;
  date1!: { year: number; month: number;};
  date2!: { year: number; month: number;};

  // public modal_value: Offer = new Offer;

  ngOnInit(): void {
    this.temp_offer.price = this.offer.price;
    this.temp_offer.discount = this.offer.discount; 
    this.temp_offer.startDate = this.offer.startDate;
    this.temp_offer.endDate = this.offer.endDate;
  }

  addOfferForm = new FormGroup({
    price : new FormControl("",[Validators.required]),
    discount : new FormControl("",[Validators.required, Validators.min(1) , Validators.max(100)]),
    startDate: new FormControl("",[Validators.required]),
    endDate: new FormControl("",[Validators.required])
  });

  open(name : any) { this.modalService.open(name).result.then((result) => { 
    console.log(result);
    this.offerDelete.emit(result);
  }, (reason) => {
    console.log(reason);
  })
  };

  open1(name : any) { 
    
    this.addOfferForm.value.price = this.offer?.price;
    this.addOfferForm.value.discount = this.offer?.discount;
    this.addOfferForm.value.startDate = this.offer?.startDate;
    this.addOfferForm.value.endDate = this.offer?.endDate;
    
    this.modalService.open(name).result.then((result) => { 

    console.log(result);
    
    // let new_offer : Offer = {price : this.offer.price ,discount : this.offer.discount, startDate : this.offer.startDate, endDate : this.offer.endDate};
    this.offerModify.emit(this.temp_offer);

  }, (reason) => {
    console.log(reason);
  })
  };

  public onKeyPrice(event : any) {this.temp_offer.price = event.target.value;}
  public onKeyDiscount(event : any) {this.temp_offer.discount = event.target.value;}
  public onKeyStartDate(event : any) {this.temp_offer.startDate = event.target.value;}
  public onKeyEndDate(event : any) {this.temp_offer.endDate = event.target.value;}
}
