import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'ofertas',
    loadChildren: () =>
      import('src/app/ofertas/ofertas.module').then((m) => m.OfertasModule),
  },
  {
    path: 'viviendas',
    loadChildren: () =>
      import('src/app/viviendas/viviendas.module').then((m) => m.ViviendasModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//done
