import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl,FormGroup ,Validators} from '@angular/forms';
import { Offer } from 'src/app/Offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  closeResult = '';
  
  constructor(private modalService: NgbModal) {}

  //public dummy_offer : Array<any> = [
  //   { discount : "10",price : "1000", startDate : "1" ,endDate : "10"},
  //   { discount : "16",price : "1900", startDate : "1" ,endDate : "20"},
  //   { discount : "17",price : "12000", startDate : "1" ,endDate : "30"},
  //   { discount : "12",price : "10900", startDate : "5" ,endDate : "10"},
  //   { discount : "15",price : "10500", startDate : "9" ,endDate : "20"}
  // ]; 
  public dummy_offer : Array<Offer> = [];
  open(content : any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.addOfferForm.value)
      
      var temp_discount = this.addOfferForm.value.discount;
      var temp_price = this.addOfferForm.value.price;
      var temp_startDate = this.addOfferForm.value.startDate;
      var temp_endDate = this.addOfferForm.value.endDate;

      // var show_startDate; 
      // var show_endDate;

      // if(this.addOfferForm.value.startDate !== null)
      // {
      //   show_startDate = toString(this.addOfferForm.value.startDate.day) + "-" + this.addOfferForm.value.startDate;
      //   show_endDate = toString(this.addOfferForm.value.startDate.day) + "-" + this.addOfferForm.value.startDate;
      // }
       
      this.dummy_offer.push({discount :temp_discount,price : temp_price,startDate : temp_startDate,endDate : temp_endDate});
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addOfferForm = new FormGroup({
    price : new FormControl("",[Validators.required]),
    discount : new FormControl("",[Validators.required, Validators.min(1) , Validators.max(100)]),
    startDate: new FormControl("",[Validators.required]),
    endDate: new FormControl("",[Validators.required])
  });

  get Price() : FormControl {
    return this.addOfferForm.get('price') as FormControl;
  }

  get Discount() : FormControl {
    return this.addOfferForm.get('discount') as FormControl;
  }

  get StartDate() : FormControl {
    return this.addOfferForm.get('startDate') as FormControl;
  }

  get EndDate() : FormControl {
    return this.addOfferForm.get('endDate') as FormControl;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
  }

  public saveOffer() {
    console.log(this.addOfferForm)
  }

  public deleteOffer(offer : Offer) {
    const index = this.dummy_offer.indexOf(offer);
    this.dummy_offer.splice(index,1);
  }

  public modifyOffer(offer : Offer,index : any) {

    this.dummy_offer[index].price = offer.price;
    this.dummy_offer[index].discount = offer.discount;
    this.dummy_offer[index].startDate = offer.startDate;
    this.dummy_offer[index].endDate = offer.endDate;

  }
}
