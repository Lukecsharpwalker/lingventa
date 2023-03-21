import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { combineLatest, map, Observable, startWith, switchMap } from 'rxjs';
import { AppService, Cities, Coordinates, DayRange, Forecast } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public forecast$!: Observable<Forecast>;

  cities: Cities[] = [
    {
      name: 'Warsaw',
      coordinates: {
        latitude: 52.23,
        longitude:21.01,
      }
    },
    {
      name: 'Prague',
      coordinates : {
        latitude: 50.09,
        longitude: 14.42,
      }
    }
  ];
  dayRanges = Array.from({length: 14}, (_, i) => i + 1);
  public form = new FormGroup({
    cityControl: new FormControl<string>(this.cities[0].name, {nonNullable: true}),
    dayRangeControl: new FormControl<number>(this.dayRanges[0], {nonNullable: true}),
  });

  constructor(
    private forecastService: AppService,
    ) {}

  ngOnInit() {
    this.forecast$ = combineLatest([
      this.form.controls.cityControl.valueChanges.pipe(startWith('Warsaw')),
      this.form.controls.dayRangeControl.valueChanges.pipe(startWith(1))
    ]).pipe(
      switchMap(([cityControl, days]) => {
        const endDateString = new Date().toISOString().split('T')[0];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days)
        const startDateString =  startDate.toISOString().split('T')[0];


        const dayRange: DayRange = {
          endDate: endDateString,
          startDate: startDateString,
        };

        const coordinates: Coordinates = this.cities.filter(city => city.name === cityControl).map(city => city.coordinates)[0]; //could be find but needs to check undefined

        return this.forecastService.getForecast(coordinates, dayRange)
      })
    )
  }


}


