import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '@core/models/article.model';
import { TranslateService } from '@ngx-translate/core';
import { ArticleService } from '@shared/services/article.service';
import { MessageService } from '@shared/services/mesage.service';
import { SpinnerService } from '@shared/services/spinner.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-editor-detail',
  templateUrl: './editor-detail.component.html',
  styleUrls: ['./editor-detail.component.scss']
})
export class EditorDetailComponent implements OnInit {
  articleForm: FormGroup;
  article: IArticle = {} as IArticle
  isSubmited: boolean = false;
  tagField = new FormControl()
  isSlug: string;
  isEdit: boolean = false
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private messageService: MessageService,
    private translate: TranslateService) {
    this.article.tagList = [];
  }

  ngOnInit(): void {
    this.isSlug = this.route.snapshot.params['slug']
    if (this.isSlug) {
      this.isEdit = true;
      this.loadArticle()
    }
    this.createAritcleForm()

  }

  loadArticle() {
    this.articleService.get(this.isSlug).subscribe(data => {
      if (data) {
        this.article = data;
        this.articleForm.patchValue(data)
      }
    })
  }

  addTags() {
    const tags = this.tagField.value;
    if (this.article.tagList.indexOf(tags) < 0) {
      this.article.tagList.push(tags)
    }

    this.tagField.reset('')
  }

  removeTag(tag: string) {
    this.article.tagList = this.article.tagList.filter(items => items !== tag)
  }

  createAritcleForm() {
    this.articleForm = this.fb.group({
      'title': this.fb.control('', [Validators.required, Validators.maxLength(100)]),
      'description': this.fb.control(''),
      'body': this.fb.control('')
    })
  }

  onSubmitForm() {
    this.isSubmited = true;
    if(this.articleForm.invalid) return;
    this.updateArticle(this.articleForm.value)
    if (this.isEdit) {
      let loading$ = this.articleService.updateArticel(this.isSlug, this.article).pipe(delay(500));
      this.spinner.onLoadObserver(loading$).subscribe(
        (articles: IArticle) => {
          this.router.navigate(['/editor/article/', articles.slug])
          this.messageService.sendMessage({
            title: this.translate.instant('editor.message.update_success'),
            type: 'success',
          });
        },
        (err: HttpErrorResponse) => {
          this.isSubmited = false;
          console.log(err)
        }
      )
    }
    else {
      let loading$ = this.articleService.saveArticle(this.article).pipe(delay(500));
      this.spinner.onLoadObserver(loading$).subscribe(
        (articles: IArticle) => {
          this.router.navigate(['/editor/article/', articles.slug])

          this.messageService.sendMessage({
            title: this.translate.instant('editor.message.publish_success'),
            type: 'success',
          });
        },
        (err: HttpErrorResponse) => {
          this.isSubmited = false;
          console.log(err)
        }
      )
    }
  }

  updateArticle(values: Object) {
    Object.assign(this.article, values)
  }
  deleteArticle() {

  }
}
