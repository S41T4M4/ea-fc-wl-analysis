import { Component } from '@angular/core';
import { CurrentWlService } from '../current-wl.service';
import { StatsWl } from './stats-wl-model';
import { WeekendLeagueModel } from './wl-model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-current-wl',
  templateUrl: './current-wl.component.html',
  styleUrls: ['./current-wl.component.css']
})
export class CurrentWlComponent {
  HighCharts: typeof Highcharts = Highcharts;
  stats: StatsWl[] = [];
  statsWl:StatsWl[] = [];
  weekendLeague: WeekendLeagueModel | null = null;
  weekendLeagueComparative: WeekendLeagueModel | null = null;
  totalGols: number = 0;
  titleColor = 'black';
  jogosWl: number = 15;
  mediaWl: number = 0;
  isTrue = false;
  id_wl: number = 0;
  golsSofridos: number = 0;
  mediaGolsSofridos: number = 0;
  idWL: number = 0;

  constructor(private currentWlService: CurrentWlService) {}
  
  ngOnInit(): void {}

  

  onWlSubmit(): void {
    if (this.id_wl > 0) { 
      this.isTrue = true;
      this.loadCurrentWl();
      this.getWlById();
    }
  }
  onWlSubmitComparative():void{
    if(this.idWL > 0){
       this.loadAnotherWl();

    }
  }
  loadAnotherWl():void{
    this.currentWlService.getJogadoresByWl(this.idWL).subscribe((
      data:StatsWl[]
    )=>{
      this.statsWl = data;

    })
  }

  loadCurrentWl(): void {
    this.currentWlService.getJogadoresByWl(this.id_wl).subscribe((data: StatsWl[]) => {
      this.stats = data;
      this.calculaTotalGols();
      this.calculaMedia();
    });
  }

  getWlById(): void {
    this.currentWlService.getWlById(this.id_wl).subscribe((data: WeekendLeagueModel) => {
      this.weekendLeague = data;
      this.golsSofridos = this.weekendLeague.gols_sofridos;
      this.calcularMediaGolsSofridos(); 
      
    });
  }

  calculaTotalGols(): void {
    this.totalGols = this.stats.reduce((acc, stat) => acc + stat.gols_marcados_na_wl, 0);
  }

  calcularMediaGolsSofridos(): void {
    this.mediaGolsSofridos = this.golsSofridos / this.jogosWl;
  }

  calculaMedia(): void {
    this.mediaWl = this.totalGols / this.jogosWl;
  }
}
