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

  @Input() offer : Offer | undefined;
  @Output() offerDelete : EventEmitter<Offer> = new EventEmitter();
  @Output() offerModify : EventEmitter<Offer> = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
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
    
    let new_offer : Offer = {price : this.addOfferForm.value.price ,discount : this.addOfferForm.value.discount, startDate : this.addOfferForm.value.startDate, endDate : this.addOfferForm.value.endDate};
    this.offerModify.emit(new_offer);

  }, (reason) => {
    console.log(reason);
  })
  };
}
