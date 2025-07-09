import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notice-main',
  templateUrl: './notice-main.component.html',
  styleUrls: ['./notice-main.component.css', './notice-main.responsive.component.css']
})
export class NoticeMainComponent implements OnInit {
    @Input()
    photoCover: string = ""
    @Input()
    cardTitle: string = ""
    @Input()
    cardTime: string = ""
    @Input()
    cardId: string = "0"

  constructor() { }

  ngOnInit(): void {
  }

}
