import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { GetAllTrendsResponse } from './models/get-all-trends-response.model';
import { GetOneTrendResponse } from './models/get-one-trend-response.model';
import { Trend, TrendPartial } from './models/trend.model';
import { TrendProvider } from './models/trend-provider.model';
import { TrendResponse } from './models/trend-response.model';
import { environment } from 'src/environments/environment';
import { updatedTrendResponse } from './models/update-trend-reponse.model';
import { createTrendResponse } from './models/create-trend-response';

@Injectable()
export class TrendService {
  private readonly urlBase = environment.avantioAPIHost;

  public readonly getAllUrl = `${this.urlBase}/v1/trends`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Trend[]> {
    return this.httpClient
      .get<GetAllTrendsResponse>(this.getAllUrl)
      .pipe(map(({ trends }) => [...trends.map(this.mapToTrendModel)]));
  }

  public getOne(id: string): Observable<Trend> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient
      .get<GetOneTrendResponse>(url)
      .pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  private mapToTrendModel(trendResponse: TrendResponse): Trend {
    return {
      id: trendResponse._id,
      body: trendResponse.body.split('\n\n'),
      createdAt: new Date(trendResponse.createdAt),
      image: trendResponse.image,
      provider: trendResponse.provider as TrendProvider,
      title: trendResponse.title,
      url: trendResponse.url,
    };
  }

  public editTrend(
    id: string,
    trend: TrendPartial
  ): Observable<updatedTrendResponse> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient.put<updatedTrendResponse>(url, trend);
  }

  public createTrend(trend: TrendPartial): Observable<createTrendResponse> {
    const url = `${this.getAllUrl}`;
    return this.httpClient.post<createTrendResponse>(url, trend);
  }

  public removeTrend(id: string): Observable<updatedTrendResponse> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient.delete<updatedTrendResponse>(url);
  }
}
