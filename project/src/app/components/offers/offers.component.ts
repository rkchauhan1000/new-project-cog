import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormControl,FormGroup ,Validators} from '@angular/forms';
import { Offer } from 'src/app/Offer';
import { Router } from '@angular/router';
import {AppServiceService} from "../../app-service.service"
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  closeResult = '';
  public isCollapsed = true;
  public user: any;

  constructor(private modalService: NgbModal,private calendar: NgbCalendar,private router : Router,private service : AppServiceService) {
    this.user = localStorage.getItem('user');
    if(!this.user) router.navigate(['/login']);
    this.getDataFromAPI();
  }

  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  date1!: { year: number; month: number;};
  date2!: { year: number; month: number;};

  modelfilterStartDate: NgbDateStruct = { year: 1999, month: 7, day: 14 };
  modelfilterEndDate: NgbDateStruct = { year: 2100, month: 7, day: 14 };
  filterStartDate: { year: number; month: number;} = { year: 1999, month: 7};
  filterEndDate: { year: number; month: number;} = { year: 2100, month: 7} ;
  option1Checked = true;
  option2Checked = true;

  public modal_value: Offer = new Offer;
  
  public dummy_offer : Array<Offer> = [];

  clearFilter(){
    this.modelfilterStartDate= { year: 1999, month: 7, day: 14 };
    this.modelfilterEndDate = { year: 2100, month: 7, day: 14 };
    this.option1Checked = true;
    this.option2Checked = true;
  }

  public checkClick(Event : any){
    console.log(Event.target.value);

    if(Event.target.value == 'option1')
    {
      this.option1Checked = !this.option1Checked;
    }
    else if(Event.target.value == 'option2')
    {
      this.option2Checked = !this.option2Checked;
    }
  }
  public isActive(OfferStartDate: NgbDateStruct,OfferEndDate : NgbDateStruct) : Boolean{
    var d = new Date();
    
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    if((OfferStartDate.year > year) || ((OfferStartDate.year == year) && (OfferStartDate.month > month)) || ((OfferStartDate.year == year) && (OfferStartDate.month == month) && (OfferStartDate.day > day)))
    {
      return false;
    } 
    if((OfferEndDate.year < year) || ((OfferEndDate.year == year) && (OfferEndDate.month < month)) || ((OfferEndDate.year == year) && (OfferEndDate.month == month) && (OfferEndDate.day < day)))
    {
      return false;
    } 
   
    return true;
  }
  getDataFromAPI(){
    const allOffers = this.service.getData().subscribe();
    let offerStorage = localStorage.getItem("offers");

    if(!offerStorage)
    { 
      localStorage.setItem("offers",JSON.stringify(this.dummy_offer));
    }
    else
    {  
      console.log(offerStorage);
      this.dummy_offer = JSON.parse(offerStorage);
    }
  }

  updateDataFromAPI(){
    this.service.updateData(this.dummy_offer).subscribe((res) => {
      console.log("Response :",res);
    })
  }

  logout(){
    localStorage.removeItem('user');
    window.alert("Successfully logged out !!")
    this.router.navigate(['/login']);
  }

  open(content : any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    
      if(this.modal_value.discount <= 0 || this.modal_value.discount >= 100)
      {
        window.alert('Discount should be in the range 1 to 99 !!');
        return;
      }
      if(this.modal_value.price <= 0)
      {
        window.alert('Price should be greater than 0 !!');
        return;
      }
      this.dummy_offer.push({discount :this.modal_value.discount,price : this.modal_value.price,startDate : this.modal_value.startDate,endDate : this.modal_value.endDate});

      localStorage.setItem("offers",JSON.stringify(this.dummy_offer));

      this.updateDataFromAPI();
      window.alert("Offer added successfully !!")
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  public deleteOffer(index : any) {
    this.dummy_offer.splice(index,1);
    localStorage.setItem("offers",JSON.stringify(this.dummy_offer));
    this.updateDataFromAPI();
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

    localStorage.setItem("offers",JSON.stringify(this.dummy_offer));
    this.updateDataFromAPI();
    window.alert("Offer updated successfully !!")
  }

  public onKeyPrice(event : any) {this.modal_value.price = event.target.value;}
  public onKeyDiscount(event : any) {this.modal_value.discount = event.target.value;}

  open102(name : any,index : any) { this.modalService.open(name).result.then((result) => { 
    console.log(result);
    this.deleteOffer(index);
  }, (reason) => {
    console.log(reason);
  })
  };

  curr_update_modal: Offer = new Offer;

  open101(name : any,index : any,offerUpdate : Offer){

    this.curr_update_modal.price = offerUpdate.price;
    this.curr_update_modal.discount = offerUpdate.discount;
    this.curr_update_modal.startDate = offerUpdate.startDate;
    this.curr_update_modal.endDate = offerUpdate.endDate;

    this.modalService.open(name).result.then((result) => { 
      console.log(result);
      this.modifyOffer(this.curr_update_modal,index);
    }, (reason) => {
      console.log(reason);
    })
  }

  public onKeyPriceUpdate(event : any) {this.curr_update_modal.price = event.target.value;}
  public onKeyDiscountUpdate(event : any) {this.curr_update_modal.discount = event.target.value;}
}
