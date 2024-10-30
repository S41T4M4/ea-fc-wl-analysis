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
  weekendLeague: WeekendLeagueModel | null = null;
  totalGols: number = 0;
  titleColor = 'black';
  jogosWl: number = 15;
  mediaWl: number = 0;
  isTrue = false;
  id_wl: number = 0;
  golsSofridos: number = 0;
  mediaGolsSofridos: number = 0;

  constructor(private currentWlService: CurrentWlService) {}
  
  ngOnInit(): void {}

  renderChart(): void {
    Highcharts.chart('analysis-chart', {
      chart: {
        type: 'column',
        backgroundColor: 'transparent'
      },
      title: {
        text: 'Análise de Gols da WL',
        style: { color: '#fff' }
      },
      xAxis: {
        categories: ['Gols Feitos', 'Gols Sofridos', 'Média Gols Feitos', 'Média Gols Sofridos'],
        labels: {
          style: { color: '#fff' }
        }
      },
      yAxis: {
        title: {
          text: 'Quantidade',
          style: { color: '#fff' }
        },
        labels: {
          style: { color: '#fff' }
        }
      },
      series: [{
        name: 'Estatísticas',
        data: [this.totalGols, this.golsSofridos, this.mediaWl, this.mediaGolsSofridos],
        type: 'column',
        color: '#47d3e6'
      }]
    });
  }

  onWlSubmit(): void {
    if (this.id_wl > 0) { 
      this.isTrue = true;
      this.loadCurrentWl();
      this.getWlById();
    }
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
      
      this.renderChart(); 
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
