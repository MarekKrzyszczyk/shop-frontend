import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chart, ChartData, registerables} from "chart.js";
import {AdminOrderService} from "../admin-order.service";

@Component({
  selector: 'app-admin-order-stats',
  templateUrl: './admin-order-stats.component.html',
  styleUrls: ['./admin-order-stats.component.scss']
})
export class AdminOrderStatsComponent implements AfterViewInit {

  @ViewChild("stats") private stats!: ElementRef;
  chart!: Chart;
  ordersNumber: number = 0;
  salesAmount: number = 0;
  private data = {
    labels: [],
    datasets: [
      {
        label: 'Orders',
        data: [],
        borderColor: '#FF3F7C',
        backgroundColor: '#FF3F7C',
        order: 1,
        yAxisID: 'y'
      },
      {
        label: 'Sales',
        data: [],
        borderColor: '#00A1FF',
        backgroundColor: '#00A1FF',
        type: 'line',
        order: 0,
        yAxisID: 'y1'
      }
    ]
  } as ChartData;

  constructor(private adminOrderService: AdminOrderService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.setupChart();
    this.getSalesStats();
  }

  private setupChart() {
    this.chart = new Chart(this.stats.nativeElement, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Sales Chart'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left'
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
  }

  private getSalesStats(): void {
    this.adminOrderService.getSalesStats().subscribe(
      stats => {
        this.data.labels = stats.labels;
        this.data.datasets[0].data = stats.orders;
        this.data.datasets[1].data = stats.sales;
        this.chart.update();
        this.ordersNumber = stats.orders.reduce((acc: number, value: number) => acc + value);
        this.salesAmount = stats.sales.reduce((acc: number, value: number) => acc + value);
      }
    );
  }
}
