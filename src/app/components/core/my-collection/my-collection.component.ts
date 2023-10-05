import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MiniatureData } from 'src/app/models/miniature-data.interface';
import { GalleryService } from 'src/app/service/gallery.service';
import { Web3Service } from 'src/app/service/web3.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent {

  miniatures: MiniatureData[] = [];
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private web3Service: Web3Service) { }

  ngOnInit(): void {
    debugger
    this.web3Service.getOwnedMiniatures()
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
