import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs-page',
  templateUrl: './gifs-page.component.html',
})
export class GifsPageComponent {
  get resultados() {
    return this.gifsServise.resultados;
  }

  constructor(private gifsServise: GifsService) {}
}
