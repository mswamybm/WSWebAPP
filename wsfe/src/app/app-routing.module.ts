import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

const routes: Routes = [
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/new', component: ArticleFormComponent },
  { path: 'articles/edit/:id', component: ArticleFormComponent }, 
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: '**', redirectTo: '/articles' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
