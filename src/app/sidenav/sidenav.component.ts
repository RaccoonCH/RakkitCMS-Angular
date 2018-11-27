import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {
  @Input() private sns: Array<{active: boolean, right: boolean}> = []
  constructor() { }

  ngOnInit() {
    setInterval(this.addSheet.bind(this), 5000)
  }

  addSheet() {
    if (this.sns.length > 0) {
      this.sns[this.sns.length - 1].active = false
    }
    this.sns.push({
      active: true,
      right: true
    })
    setTimeout(() => {
      this.sns[this.sns.length - 1].right = false
    })
  }

  closeSheet(index) {
    this.sns[index].right = true
    if (this.sns.length > 1) {
      this.sns[index - 1].active = true
    }
    setTimeout(() => {
      this.sns.splice(index, 1)
      console.log(this.sns)
    }, 200)
  }
}
