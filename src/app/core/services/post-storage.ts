import {effect, Service, signal} from '@angular/core';
import Post from '../../shared/models/post.model';
import * as uuid from 'uuid';

@Service()
export class PostStorage {
  private readonly _posts = signal<Post[]>([]);
  readonly posts = this._posts.asReadonly();

  constructor() {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      this._posts.set(JSON.parse(savedPosts) || []);
    }
    effect(() => {
      localStorage.setItem('posts', JSON.stringify(this._posts()));
    });
  }

  addPost(title: string, content: string, author: string) {
    const post: Post = {
      uuid: uuid.v4(),
      title,
      content,
      datetime: new Date().toISOString(),
      author
    };
    this._posts.update((currentPosts) => [...currentPosts, post]);
  }

  removePost(postUUID: string) {
    this._posts.update((currentPosts) => currentPosts.filter(post => post.uuid !== postUUID));
  }

  clearPosts() {
    this._posts.set([]);
  }
}
