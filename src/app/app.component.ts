import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  VenusObservationTimer:number=0;
  SunObservationTimer:number=0;
  oneSecond:number=1000;
  pleasureDuration:number=20*this.oneSecond;
  daylightDuration:number=1000*3600*12;
  seeingTheSun$$!:Subscription;
  secondQuantityBeforeSunset:number=0;
  

  //constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    const venus$=interval(this.oneSecond);
    const earthFromMoon$=interval(this.pleasureDuration);
    
    venus$.subscribe(oeil => console.log("Ether "+oeil));

    const pleasureFromAtacama$$ =venus$.subscribe(oeil => {
      console.log("Temps d'observation de Vénus depuis Atacama "+oeil);
      this.VenusObservationTimer = oeil;
      //this.cdr.detectChanges;
    });

    const pleasureFromSahara$$ =venus$.subscribe(oeil => console.log("Temps d'observation de Vénus depuis Sahara "+oeil));

    earthFromMoon$.subscribe(oeil => console.log("La terre vue de la lune "+oeil));

    setTimeout(() => pleasureFromAtacama$$.unsubscribe(),this.pleasureDuration);

    setTimeout(() => pleasureFromSahara$$.unsubscribe(),this.pleasureDuration);
    
    const sun$=interval(this.oneSecond);
    this.seeingTheSun$$=sun$.subscribe(oeil => {
        this.SunObservationTimer=oeil;
        this.secondQuantityBeforeSunset=this.daylightDuration-oeil;
        console.log("Temps d'observation du soleil");
       
    });
    setTimeout(()=>this.seeingTheSun$$.unsubscribe,this.daylightDuration);
    
   
  }
  title = 'starinthesky';

  
  ngOnDestroy() {
    if (this.seeingTheSun$$) {
      this.seeingTheSun$$.unsubscribe();
    }
  }
  


}
