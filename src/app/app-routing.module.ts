import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './components/core/gallery/gallery.component';
import { MyCollectionComponent } from './components/core/my-collection/my-collection.component';
import { MintingComponent } from './components/core/minting/minting.component';

const routes: Routes = [{
  path: 'gallery',
  data: { title: 'Gallery' },
  component: GalleryComponent
},
{
  path: 'my-collection',
  data: { title: 'My Collection' },
  component: MyCollectionComponent
},
{
  path: 'minting',
  data: { title: 'Minting' },
  component: MintingComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
