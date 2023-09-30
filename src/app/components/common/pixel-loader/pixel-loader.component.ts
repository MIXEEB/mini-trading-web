import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'pixel-loader',
  templateUrl: './pixel-loader.component.html',
  styleUrls: ['./pixel-loader.component.scss']
})
export class PixelLoaderComponent implements OnInit, OnDestroy{
  
  loaderText: string = '.';
  count: number = 0;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = interval(200).subscribe(() => {
      this.count = (this.count + 1) % 4;
      this.loaderText = '.'.repeat(this.count);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }  
}
