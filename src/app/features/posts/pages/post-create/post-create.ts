import {Component, computed, inject} from '@angular/core';
import {HlmCardImports} from '@spartan-ng/helm/card';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PostStorage} from '../../../../core/services/post-storage';
import {HlmInputImports} from '@spartan-ng/helm/input';
import {HlmInputGroupImports} from '@spartan-ng/helm/input-group';
import {HlmFieldImports} from '@spartan-ng/helm/field';
import {Router} from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmInputGroupImports,
    ...HlmFieldImports
  ],
  selector: 'app-post-create',
  styleUrl: './post-create.css',
  templateUrl: './post-create.html',
})
export class PostCreate {
  private postStorage = inject(PostStorage);
  private router = inject(Router);

  postForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]}
    ),
    content: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)]}
    ),
    author: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]}
    ),
  });

  onSubmit() {
    if (this.postForm.valid) {
      const postData = this.postForm.getRawValue();
      this.postStorage.addPost(postData.title, postData.content, postData.author);
      this.postForm.reset();
      this.router.navigate(['/']);
    } else {
      this.postForm.markAllAsTouched();
    }
  }
}
