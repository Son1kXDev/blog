import {Component, computed, inject} from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {DatePipe} from '@angular/common';
import { remixCloseLine } from '@ng-icons/remixicon';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {PostStorage} from '../../../../core/services/post-storage';

@Component({
  imports: [...HlmCardImports, ...HlmButtonImports, DatePipe, NgIcon],
  providers: [provideIcons({ remixCloseLine })],
  selector: 'app-post-feed',
  styleUrl: './post-feed.css',
  templateUrl: './post-feed.html',
})
export class PostFeed {
  protected readonly postStorage = inject(PostStorage);
  posts = this.postStorage.posts;
  postsCount = computed(() => this.posts().length);
}
