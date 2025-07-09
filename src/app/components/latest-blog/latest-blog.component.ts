import { Component, OnInit } from '@angular/core';
import { dataFake } from 'src/app/dados/dataFake';

@Component({
  selector: 'app-latest-blog',
  templateUrl: './latest-blog.component.html',
  styleUrls: ['./latest-blog.component.css']
})
export class LatestBlogComponent implements OnInit {
  // Lista de blogs filtrados
  blogs: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Filtrando apenas os registros com status "antigos"
    this.blogs = dataFake.filter(item => item.old_articles === "yes").map(item => ({
      image: item.photoCover,
      title: item.title,
      resume: item.resume,
      time: item.time,
      id: item.id
    }));
  }
}
