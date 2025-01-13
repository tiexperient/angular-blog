import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dataFake } from '../../dados/dataFake';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css', './content.responsive.component.css']
})


export class ContentComponent implements OnInit {

  @Input()
  photoCover: string = ""
  @Input()
  contentTitle: string = ""
  @Input()
  contentDescription: string = ""
  private id: string | null= "0"
  dataFake: any;

  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( value =>
      this.id = value.get("id")
    )

    this.setValuesToComponent(this.id) 
  }

  setValuesToComponent(id:string | null){
    const result = dataFake.filter(article => article.id == id )[0]
    
    this.contentTitle = result.title
    this.contentDescription = result.description
    this.photoCover = result.photoCover
    
  }

}
