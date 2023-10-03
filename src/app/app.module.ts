import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PixelButtonComponent } from './components/common/pixel-button/pixel-button.component';
import { PixelSpanComponent } from './components/common/pixel-span/pixel-span.component';
import { MiniatureUrlSelectorComponent } from './components/poc/miniature-url-selector/miniature-url-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MiniatureCardComponent } from './components/poc/miniature-card/miniature-card.component';
import { MiniatureGalleryComponent } from './components/poc/miniature-gallery/miniature-gallery.component';
import { RootComponent } from './components/root/root.component';
import { HeaderComponent } from './components/root/header/header.component';
import { PixelLoaderComponent } from './components/common/pixel-loader/pixel-loader.component';
import { GalleryComponent } from './components/core/gallery/gallery.component';
import { MyCollectionComponent } from './components/core/my-collection/my-collection.component';
import { MintingComponent } from './components/core/minting/minting.component';

@NgModule({
  declarations: [
    AppComponent,
    PixelButtonComponent,
    PixelSpanComponent,
    MiniatureUrlSelectorComponent,
    MiniatureCardComponent,
    MiniatureGalleryComponent,
    RootComponent,
    HeaderComponent,
    PixelLoaderComponent,
    GalleryComponent,
    MyCollectionComponent,
    MintingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
