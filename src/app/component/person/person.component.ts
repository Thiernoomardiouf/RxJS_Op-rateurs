import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  public persons: any[] = [];
  public personsDix: any[] = [];

  public dix:number = 10;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getPerson();
  }
  public getPerson(){
    this.personService.getPerson().subscribe(
      (data: any)=>{
        this.persons = data;
        this.personsDix = this.persons.slice(0,10);
       // console.log(data);
      },err=>{
        console.log(err);
      }
    );
  }

  public getPersons(){
      this.dix += 10;
      this.personsDix = this.persons.slice(0,this.dix);
  }

}
