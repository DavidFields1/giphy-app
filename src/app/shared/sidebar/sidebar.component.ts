import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @ViewChild('item') item!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  get historial() {
    return this.gifsService.historial;
  }

  setHistorialItem(event: any) {
    this.gifsService.buscarGifs(event.target.innerText);
  }

  borrarHistorial() {
    this.gifsService.borrarHistorial();
  }
}
