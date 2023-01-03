import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from 'src/app/interface/service.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private API_KEY: string = 'XLFc7pREgycs8vw94jO7KCaySGOe92aS';
  private _historial: string[] = [];
  private endpointStart: string = `https://api.giphy.com/v1/gifs/trending?api_key=${this.API_KEY}&limit=10`;
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.http.get<SearchGifsResponse>(this.endpointStart).subscribe((resp) => {
      this.resultados = [...resp.data];
    });
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    const endpointSearch = `https://api.giphy.com/v1/gifs/search?api_key=${this.API_KEY}&q=${query}&limit=10`;

    if (this._historial.includes(query)) {
      const idxFound = this._historial.indexOf(query);
      this._historial.splice(idxFound, 1);
    }

    this._historial.unshift(query);
    this._historial = this._historial.splice(0, 10);

    localStorage.setItem('historial', JSON.stringify(this._historial));

    this.http.get<SearchGifsResponse>(endpointSearch).subscribe((resp) => {
      this.resultados = [...resp.data];
    });
  }

  borrarHistorial() {
    localStorage.removeItem('historial');
    this._historial = [];
  }
}
