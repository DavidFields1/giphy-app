import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from 'src/app/interface/service.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private API_KEY: string = 'XLFc7pREgycs8vw94jO7KCaySGOe92aS';
  private API_LIMIT: number = 10;
  private API_URL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  private endpointTrending: string = `${this.API_URL}/trending?api_key=${this.API_KEY}&limit=${this.API_LIMIT}`;
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.http
      .get<SearchGifsResponse>(this.endpointTrending)
      .subscribe((resp) => {
        this.resultados = [...resp.data];
      });
  }

  buscarGifs(query: string) {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('q', query)
      .set('limit', this.API_LIMIT);
    const endpointSearch = `${this.API_URL}/search`;

    query = query.trim().toLowerCase();

    if (this._historial.includes(query)) {
      const idxFound = this._historial.indexOf(query);
      this._historial.splice(idxFound, 1);
    }

    this._historial.unshift(query);
    this._historial = this._historial.splice(0, 10);

    localStorage.setItem('historial', JSON.stringify(this._historial));

    this.http
      .get<SearchGifsResponse>(endpointSearch, { params })
      .subscribe((resp) => {
        this.resultados = [...resp.data];
      });
  }

  borrarHistorial() {
    localStorage.removeItem('historial');
    this._historial = [];
  }
}
