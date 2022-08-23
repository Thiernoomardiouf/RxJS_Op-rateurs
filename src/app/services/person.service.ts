import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  public getPerson(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      map((data: any)=>
        data.map((item: any)=>{
          return {
            id: item.id,
            title: item.title,
          }
        })
     )
    );
  }
}
