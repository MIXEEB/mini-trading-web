import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MiniatureData } from 'src/app/models/miniature-data.interface';
import { Web3Service } from 'src/app/service/web3.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss']
})
export class MyCollectionComponent {

  miniatures: MiniatureData[] = [];
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private web3Service: Web3Service,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.web3Service.connectedAccount) {
      this.router.navigate(['gallery']);
      return;
    }

    this.getMiniatures();
  }

  getMiniatures() {
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
