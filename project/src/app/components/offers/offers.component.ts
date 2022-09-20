import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormControl,FormGroup ,Validators} from '@angular/forms';
import { Offer } from 'src/app/Offer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  closeResult = '';
  public isCollapsed = true;
  constructor(private modalService: NgbModal,private calendar: NgbCalendar,private router : Router) {
    var user = localStorage.getItem('user');

    if(!user) router.navigate(['/login']);
  }

  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  date1!: { year: number; month: number;};
  date2!: { year: number; month: number;};

  modelfilterStartDate: NgbDateStruct = { year: 1999, month: 7, day: 14 };
  modelfilterEndDate: NgbDateStruct = { year: 2100, month: 7, day: 14 };
  filterStartDate: { year: number; month: number;} = { year: 1999, month: 7};
  filterEndDate: { year: number; month: number;} = { year: 2100, month: 7} ;

  public modal_value: Offer = new Offer;
  //public dummy_offer : Array<any> = [
  //   { discount : "10",price : "1000", startDate : "1" ,endDate : "10"},
  //   { discount : "16",price : "1900", startDate : "1" ,endDate : "20"},
  //   { discount : "17",price : "12000", startDate : "1" ,endDate : "30"},
  //   { discount : "12",price : "10900", startDate : "5" ,endDate : "10"},
  //   { discount : "15",price : "10500", startDate : "9" ,endDate : "20"}
  // ]; 
  public dummy_offer : Array<Offer> = [];

  logout(){
    localStorage.removeItem('user');
    window.alert("Successfully logged out !!")
    this.router.navigate(['/login']);
  }
  open(content : any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.addOfferForm.value)
      console.log("MODAL VALUES : -",this.modal_value);

      var temp_discount = this.modal_value.discount;
      var temp_price = this.modal_value.price;
      var temp_startDate = this.model;
      var temp_endDate = this.model1;

      // var temp_discount = this.addOfferForm.value.discount;
      // var temp_price = this.addOfferForm.value.price;
      // var temp_startDate = this.addOfferForm.value.startDate;
      // var temp_endDate = this.addOfferForm.value.endDate;

      // var show_startDate; 
      // var show_endDate;

      // if(this.addOfferForm.value.startDate !== null)
      // {
      //   show_startDate = toString(this.addOfferForm.value.startDate.day) + "-" + this.addOfferForm.value.startDate;
      //   show_endDate = toString(this.addOfferForm.value.startDate.day) + "-" + this.addOfferForm.value.startDate;
      // }
      
      var curr_price = parseInt(this.modal_value.price);
      var curr_discount = parseInt(this.modal_value.discount);

      if(curr_price <= 0 || curr_discount <= 0 || curr_discount >= 100) return;

      this.dummy_offer.push({discount :temp_discount,price : temp_price,startDate : temp_startDate,endDate : temp_endDate});
      window.alert("Offer added successfully !!")
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
    window.alert("Offer deleted successfully !!")
  }

  public modifyOffer(offer : Offer,index : any) {

    if(offer.discount <= 0 || offer.discount >= 100)
    {
      window.alert("Discount should be between 0 and 100");
      return;
    } 
    
    if(offer.price <= 0){
      window.alert("Price should be greater than 0");
      return;
    } 

    if((offer.startDate.year > offer.endDate.year) || ((offer.startDate.year == offer.endDate.year) && (offer.startDate.month > offer.endDate.month)) || ((offer.startDate.year == offer.endDate.year) && (offer.startDate.month == offer.endDate.month) && (offer.startDate.day > offer.endDate.day)))
    {
      window.alert("Start Date should be less than End Date !!");
      return;
    }

    this.dummy_offer[index].price = offer.price;
    this.dummy_offer[index].discount = offer.discount;
    this.dummy_offer[index].startDate = offer.startDate;
    this.dummy_offer[index].endDate = offer.endDate;

    window.alert("Offer updated successfully !!")
  }

  public onKeyPrice(event : any) {this.modal_value.price = event.target.value;}
  public onKeyDiscount(event : any) {this.modal_value.discount = event.target.value;}
  public onKeyStartDate(event : any) {this.modal_value.startDate = event.target.value;}
  public onKeyEndDate(event : any) {this.modal_value.endDate = event.target.value;}
}
