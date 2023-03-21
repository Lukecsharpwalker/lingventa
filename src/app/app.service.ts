import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseURL = 'https://api.open-meteo.com/v1/forecast?';
  constructor(private http: HttpClient) { }

  getForecast(coordinates: Coordinates, dayRange: DayRange) {
    return this.http.get<Forecast>
      (`${this.baseURL}latitude=${coordinates.latitude}&` +
      `longitude=${coordinates.longitude}&` +
      `start_date=${dayRange.startDate}&` +
      `end_date=${dayRange.endDate}&` +
      `daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&` +
      `timezone=auto`)
  }

}
export interface ForecastParameters {
  city: string;
  dayRange: number;
}
export interface DayRange {
  startDate: string;
  endDate: string;
}
export interface Cities {
  name: string;
  coordinates: Coordinates;
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}
export interface Forecast {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: DailyUnits
  daily: Daily
}

export interface DailyUnits {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  sunrise: string
  sunset: string
  rain_sum: string
}

export interface Daily {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  sunrise: string[]
  sunset: string[]
  rain_sum: number[]
}
