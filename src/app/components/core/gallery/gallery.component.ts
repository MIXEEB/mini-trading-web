import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, concat, takeUntil } from 'rxjs';
import { MiniatureData } from 'src/app/models/miniature-data.interface';
import { Web3Service } from 'src/app/service/web3.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

    miniatures: any[] = [];
    componentDestroyed$: Subject<boolean> = new Subject();

    get connectedAccount(): string {
      return this.web3Service.connectedAccount;
    } 

    constructor(
      private web3Service: Web3Service,
      private cdr: ChangeDetectorRef
      ) {}

    ngOnInit(): void {
      concat(
        this.web3Service.getAllMiniatures(),
        this.web3Service.listenToMiniatureMintedEvent()
      ).subscribe((miniatures: MiniatureData[]) => {
        this.miniatures = [...this.miniatures, ...miniatures];//.filter((miniature) => miniature.owner !== this.connectedAccount);
        this.cdr.detectChanges();
      });
    }

    buyMiniature(miniatureData: MiniatureData) {
      if (miniatureData.index === undefined) {
        return;
      }
      this.web3Service.buyMiniature(miniatureData.index)
        .subscribe((response) => {
          console.log('miniature purchased', response);
        })
    }

    ngOnDestroy(): void {
      this.componentDestroyed$.next(true);
    }
}
