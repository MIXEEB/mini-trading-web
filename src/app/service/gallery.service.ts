import { Injectable } from '@angular/core';
import { MiniatureData } from '../models/miniature-data.interface';
import { Observable, of, switchMap } from 'rxjs';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private miniatureData: MiniatureData[] = [];

  constructor(private web3Service: Web3Service) { }



  getGallery(): Observable<MiniatureData[]> {
    return of(this.miniatureData).pipe(
      switchMap((miniatures: MiniatureData[]) => {
        if (!miniatures.length) {
          return this.web3Service.getAllMiniatures();
        }

        return of(miniatures);
      })
    );
  }
}
