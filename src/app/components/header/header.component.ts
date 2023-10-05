import { LoginService } from '@/app/service/login';
import { resType } from '@/types/response/response';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy, AfterViewInit, OnInit {
  folderControl = 'menu-unfold'; //folder展开控制
  originScrollY = 0;
  scrollDerection = 'down';
  isLogin = false;
  @Input()
  defaultShow = false;
  @ViewChild('container')
  container!: ElementRef;
  @Input()
  scrollTarget!: number;
  @Input()
  showFolderIcon!: boolean; //是否显示folder图标
  @Output()
  upload = new EventEmitter();
  @Output()
  drawerOpen = new EventEmitter();

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private ls: LoginService,
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.ls.getUserInfo().subscribe((res: resType<any>) => {
        if (res.code === 200) this.isLogin = true;
      });
    }
  }
  goHome() {
    this.router.navigate(['home']);
  }
  login() {
    this.router.navigate(['/login']);
  }
  ngAfterViewInit(): void {
    this.onScroll();
    if (this.defaultShow) {
      this.container.nativeElement.classList.add('active');
      this.container.nativeElement.classList.remove('hidden');
    }
  }

  //监控滚动事件
  onScroll() {
    window.onscroll = () => {
      this.originScrollY < window.scrollY
        ? (this.scrollDerection = 'down')
        : (this.scrollDerection = 'up');
      this.originScrollY = window.scrollY;
      if (window.scrollY >= this.scrollTarget) {
        this.container.nativeElement.classList.add('active');
        if (this.scrollDerection === 'down') {
          this.container.nativeElement.classList.add('hidden');
        } else {
          this.container.nativeElement.classList.remove('hidden');
        }
      } else {
        this.container.nativeElement.classList.remove('active');
        this.container.nativeElement.classList.remove('hidden');
      }
    };
  }
  //组件销毁同时清除滚动事件
  ngOnDestroy(): void {
    window.onscroll = null;
  }
  //folder展开
  folderShow() {
    this.folderControl =
      this.folderControl === 'menu-fold' ? 'menu-unfold' : 'menu-fold';
    this.drawerOpen.emit();
  }
}
