import { CategoryService } from '@/app/service/category.service';
import { articleInFolderCount } from '@/types/category/category';
import { resType } from '@/types/response/response';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-folder-cate',
  templateUrl: './folder-cate.component.html',
  styleUrls: ['./folder-cate.component.scss'],
  standalone: false,
})
export class FolderCateComponent implements OnInit, OnDestroy {
  smallSize!: Observable<boolean>;
  isLogin: Observable<boolean>;
  @Input()
  showMsgAndArticle = true;
  folders: articleInFolderCount[] = [];
  loading = true;
  subscriptionList: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private store: Store<{ smallSize: boolean; isLogin: boolean }>,
  ) {
    this.smallSize = store.select('smallSize');
    this.isLogin = store.select('isLogin');
  }
  ngOnInit(): void {
    this.subscriptionList.push(
      this.categoryService
        .getArticleInFolderCount()
        .subscribe((res: resType<any>) => {
          this.loading = false;
          if (res.code === 200)
            this.folders = res.data as articleInFolderCount[];
        }),
    );
  }
  toSingleFolderCate(folderId: number) {
    this.router.navigate(['folderPage', folderId]);
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscripion) => {
      subscripion.unsubscribe();
    });
  }
}
