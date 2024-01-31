import { closedFloat, judgeSeason, seasonSelect } from '@/utils/seasonFloat';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.scss'],
})
export class CircleMenuComponent implements AfterViewInit, OnDestroy {
  showMenu = false;
  isPress = false;
  currentSeason: 'Spring' | 'Summer' | 'Winter' | 'Autumn' = judgeSeason();
  @Input() flag = new Proxy(
    {
      value: JSON.parse(localStorage.getItem('seasonFloat') || 'true'),
      that: this,
    },
    {
      get(target: any, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        window.removeEventListener('resize', target.that.seasonResizeCallback);
        clearInterval(target.that.intervel);
        if (value) {
          window.addEventListener('resize', target.that.seasonResizeCallback);
          target.that.intervel = setInterval(target.that.intervalCallback, 100);
        }
        return true;
      },
    },
  );
  intervel: any = null;
  timeout: any = null;
  @ViewChild('menu')
  menu!: ElementRef;

  @ViewChild('menu_wrapper')
  menu_wrapper!: ElementRef;

  heightObserver = new Proxy(
    { height: 0 },
    {
      get: (target: any, prop) => {
        return target[prop];
      },
      set: (target, prop, value) => {
        target[prop] = value;
        this.changeSeason(this.currentSeason);
        return true;
      },
    },
  );

  seasonResizeCallback = () => {
    closedFloat();
    //使用节流
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.changeSeason(this.currentSeason);
        clearTimeout(this.timeout);
      }, 500);
    } else {
      this.timeout = setTimeout(() => {
        this.changeSeason(this.currentSeason);
        clearTimeout(this.timeout);
      }, 500);
    }
  };

  intervalCallback = () => {
    if (this.heightObserver.height !== $(document as any).height()) {
      this.heightObserver.height = $(document as any).height();
    }
  };

  ngAfterViewInit(): void {
    //面板样式控制
    document
      .querySelector('[has-ripple="true"]')
      ?.addEventListener('click', () => {
        document.getElementById('menu-btn')!.classList.toggle('clicked');
        this.menu.nativeElement.classList.toggle('open');
        this.showMenu = !this.showMenu;
        this.menu.nativeElement
          .querySelectorAll('a')
          .forEach((item: any, index: number) => {
            item.addEventListener('click', (e: any) => {
              e.preventDefault();
              (
                this.menu.nativeElement.querySelectorAll(
                  '.menuitem-wrapper',
                ) as any
              )[index].classList.add('spin');
              const timer = setTimeout(() => {
                (
                  this.menu.nativeElement.querySelectorAll(
                    '.menuitem-wrapper',
                  ) as any
                )[index].classList.remove('spin');
                document
                  .getElementById('menu-btn')!
                  .classList.remove('clicked');
                this.menu.nativeElement.classList.remove('open');
                requestAnimationFrame(() => {
                  this.showMenu = false;
                });
                clearTimeout(timer);
              }, 800);
            });
          });
      });

    /*
      页面大小变化时控制飘落显示
      主要有这两种情况：
      1.页面大小变化，引起页面高度变化，那么会走intervel,重新计算飘落面积
      2.页面大小变化，不会引起高度变化，那么则不会走intervel，于是我用seasonResizeCallback来解决这种情况
      3.初始化，由于一开始设置height为0，所以会搭配intervel进行一次初始化
    */
    if (this.flag.value) {
      window.addEventListener('resize', this.seasonResizeCallback);
      this.intervel = setInterval(this.intervalCallback, 100);
    }
  }

  changeSeason(type: 'Spring' | 'Summer' | 'Winter' | 'Autumn') {
    this.flag.value = true;
    localStorage.setItem('seasonFloat', 'true');
    this.currentSeason = type;
    seasonSelect(this.currentSeason);
  }

  toggleFloat() {
    this.currentSeason = judgeSeason();
    if (this.flag.value) {
      closedFloat();
      this.flag.value = false;
      localStorage.setItem('seasonFloat', 'false');
    } else {
      this.changeSeason(this.currentSeason);
    }
  }

  //模拟鼠标按压移动
  onMousedown() {
    this.isPress = true;
  }

  onMousemove(e: any) {
    if (this.isPress) {
      this.menu_wrapper.nativeElement.style.top = e.y + 'px';
      this.menu_wrapper.nativeElement.style.left = e.x + 'px';
    }
  }

  onMouseup() {
    this.isPress = false;
  }
  onTouchmove(e: any) {
    const firstTouch = e.touches[0];
    if (firstTouch) {
      e.preventDefault();
      this.menu_wrapper.nativeElement.style.top = firstTouch.clientY + 'px';
      this.menu_wrapper.nativeElement.style.left = firstTouch.clientX + 'px';
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.intervel);
  }
}
