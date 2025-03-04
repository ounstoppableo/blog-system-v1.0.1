import { CategoryService } from '@/app/service/category.service';
import { tag } from '@/types/home/home';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cate-by-tag',
  templateUrl: './cate-by-tag.component.html',
  styleUrls: ['./cate-by-tag.component.scss'],
  standalone: false,
})
export class CateByTagComponent implements OnInit, OnDestroy {
  smallSize: Observable<boolean>;
  isLogin: Observable<boolean>;
  @Input()
  showMsgAndArticle = true;
  tags: tag[] = [];
  subscriptionList: any[] = [];
  loading = true;
  constructor(
    private categoryService: CategoryService,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  ngOnInit(): void {
    this.subscriptionList.push(
      this.categoryService
        .getArticleInTagCount()
        .subscribe((res: resType<any>) => {
          this.loading = false;
          if (res.code === 200) this.tags = res.data;
        }),
    );
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
  }
}
