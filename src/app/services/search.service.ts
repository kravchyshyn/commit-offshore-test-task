import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookDataResponse, RESULTS_LIMIT } from '../models/search.models';
@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param query: string - parameter used to find cities starts from query value
   * @returns Observable<ICityData[] - array of cities
   */
  public search(
    query: string,
    page: number = 0,
    limit: number = RESULTS_LIMIT
  ): Observable<IBookDataResponse> {
    return this.http.get<IBookDataResponse>(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&startIndex=${
        page * limit
      }&key=AIzaSyC8UXw89-Qezz3hjvbV3RlStH-1ajbYIgo`
    );
  }
}
