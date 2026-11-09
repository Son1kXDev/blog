import { Routes } from '@angular/router';
import { PostFeed } from './features/posts/pages/post-feed/post-feed';
import { PostCreate } from './features/posts/pages/post-create/post-create';

export const routes: Routes = [
  { path: '', component: PostFeed },
  { path: 'create', component: PostCreate }
];
