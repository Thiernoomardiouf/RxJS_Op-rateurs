import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription, of, from, map, tap, take, filter, combineLatest, forkJoin, withLatestFrom, Subject, BehaviorSubject, merge, scan } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
      // const observer = {
      //   next: (item: unknown)=> console.log(`Une boite arrive ${item}`),
      //   error: (err: unknown)=>console.log(`Oups une erreur est survenue ${err}`),
      //   complete: ()=>console.log(`Toutes les boites sont arrivées`)
      // };

      // const stream = new Observable(myObservable=>{
      //   myObservable.next('boite 1');
      //   myObservable.next('boite 2');
      //   //myObservable.error(new Error('Oups une erreur est survenue'));
      //   myObservable.next('boite 3');
      //   myObservable.complete();
      // });
      // const subscription = stream.subscribe(
      //   item => console.log(`Une boite arrive ${item}`),
      //   err => console.log(`Oups une erreur est survenue ${err}`),
      //   () => console.log(`Toutes les boites sont arrivées`)
      // );
      // subscription.unsubscribe();

      // const double = (source: Observable<number>)=>
      //   new Observable<number>(subscriber=>{
      //     const subcription = source.subscribe({
      //       next: (item: number)=>subscriber.next(item*2),
      //       error: (err: unknown)=>subscriber.error(err),
      //       complete: ()=>subscriber.complete()
      //     })
      //     return ()=>{
      //       subcription.unsubscribe();
      //     }
      //   });
      //   of(1,2,3,4,5)
      //   .pipe(
      //     double,
      //     double)
      //   .subscribe(console.log);

      from([1,2,0,12,13,0,14,15])
      .pipe(
        // tap(item=>console.log(`Avant le map ${item}`)),
        // map((elem: number)=>{
        //   if(elem==0){
        //     throw new Error('Oups une erreur est survenue');
        //   }
        //   return elem*2;
        // }),
        // map(item => item - 2),
        // take(2)
        filter(item => item != 0)
      )
      .subscribe(
        item => console.log(`Une valeur ${item}`),
        err => console.log(err),
        () => console.log(`Terminé`)
      );

      // combineLatest && forkJoin && withLatestFrom
      const a$ = of(1,2,3,4,5);
      const b$ = of(6,7,8,9,10);
      const c$ = of(11,12,13,14,15);
      combineLatest([a$,b$,c$]).subscribe((val)=>console.log('CombineLatest',val));
      forkJoin([a$,b$,c$]).subscribe((val)=>console.log('forkJoin',val));

      a$.pipe(
        withLatestFrom(b$,c$)
      ).subscribe((val)=>console.log('withLatestFrom :',val));

      // Subject : permet de créer un flux à partir de rien
      // BehaviorSubject : permet de créer un flux à partir de rien et de lui donner une valeur par défaut
      const subject = new Subject<number>();
      const bsubject = new BehaviorSubject<number>(0);

      subject.subscribe({
        next: (value)=>console.log('A', value)
      })
      subject.subscribe({
        next: (value)=>console.log('B', value)
      })
      bsubject.subscribe({
        next: (value)=>console.warn('A', value)
      })
      bsubject.subscribe({
        next: (value)=>console.warn('B', value)
      })

      subject.next(1);
      subject.next(2);
      subject.next(3);
      bsubject.next(1);
      bsubject.next(2);
      bsubject.next(3);

      subject.subscribe({
        next: (value)=>console.log('C', value)
      })
      bsubject.subscribe({
        next: (value)=>console.warn('C', value)
      })
      subject.next(12);
      bsubject.next(12);

      // merge()
      const a = interval(1000).pipe(
        tap((item)=>console.log('A', item)),
        take(3)
      )
      const b = interval(1000).pipe(
        tap((item)=>console.log('B', item)),
        take(3)
      )
      merge(a,b).subscribe(console.log);

      // scan()
      of(1,2,3,4,5).pipe(
        scan((acc, item)=>acc+item, 0)
      ).subscribe(console.log); 
  }

  public start():void{
    this.subscription.add(interval(1000).subscribe(
      value => console.log('Ma value est ' + value),
      err => console.log('Une erreur est survenue ' + err),
      () => console.log('Fin de la séquence')
    ));
    this.subscription.add(interval(1000).subscribe(
      value => console.warn(' == Ma value est ==' + value),
      err => console.warn('== Une erreur est survenue ==' + err),
      () => console.warn('== Fin de la séquence ==')
    ));
  }

  public stop():void{
    this.subscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
