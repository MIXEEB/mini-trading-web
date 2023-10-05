import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MiniatureData } from 'src/app/models/miniature-data.interface';
import { GalleryService } from 'src/app/service/gallery.service';
import { Web3Service } from 'src/app/service/web3.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

    miniatures: any[] = [];
    componentDestroyed$: Subject<boolean> = new Subject();

    constructor(private galleryService: GalleryService) {}

    ngOnInit(): void {
      this.galleryService.getGallery()
        .pipe(
          takeUntil(this.componentDestroyed$)
        )
        .subscribe((miniatures: MiniatureData[]) => {
          this.miniatures = miniatures;
        }
      );
    }

    ngOnDestroy(): void {
      this.componentDestroyed$.next(true);
    }
}
