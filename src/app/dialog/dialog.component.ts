import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlbum } from '../pages/models/element';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAlbum,
    private albumService: AlbumService) {
  }
  
  public confirm(): void {
    this.albumService.deleteAlbum(this.data.id);
  }
  
}
