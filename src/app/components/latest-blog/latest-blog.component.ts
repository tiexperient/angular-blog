import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-latest-blog',
  templateUrl: './latest-blog.component.html',
  styleUrls: ['./latest-blog.component.css']
})
export class LatestBlogComponent implements AfterViewInit {
  @ViewChild('cardsContainer', { static: false }) cardsContainer!: ElementRef;

  // Dados das cartas
  cards = [
    {
      image: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100',
      title: 'Card Title 1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dicta error nam eaque. Eum fuga laborum quos expedita iste saepe similique, unde possimus quia at magnam sed cupiditate? Reprehenderit, harum!'
    },
    {
      image: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100',
      title: 'Card Title 2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dicta error nam eaque. Eum fuga laborum quos expedita iste saepe similique, unde possimus quia at magnam sed cupiditate? Reprehenderit, harum!'
    },
    {
      image: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100',
      title: 'Card Title 3',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dicta error nam eaque. Eum fuga laborum quos expedita iste saepe similique, unde possimus quia at magnam sed cupiditate? Reprehenderit, harum!'
    }
  ];

  ngAfterViewInit(): void {
    const cardsContainer = this.cardsContainer.nativeElement;
    const cards: NodeListOf<HTMLElement> = cardsContainer.querySelectorAll('.card');

    cardsContainer.style.setProperty('--cards-count', cards.length.toString());
    cardsContainer.style.setProperty('--card-height', `${cards[0].clientHeight}px`);

    cards.forEach((card, index) => {
      const offsetTop = 20 + index * 20;
      card.style.paddingTop = `${offsetTop}px`;

      if (index === cards.length - 1) return;

      const toScale = 1 - (cards.length - 1 - index) * 0.1;
      const nextCard = cards[index + 1];
      const cardInner = card.querySelector<HTMLElement>('.card__inner');

      if (nextCard && cardInner) {
        ScrollObserver.Element(nextCard, {
          offsetTop,
          offsetBottom: window.innerHeight - card.clientHeight
        }).onScroll(({ percentageY }: { percentageY: number }) => {
          cardInner.style.transform = `scale(${valueAtPercentage({
            from: 1,
            to: toScale,
            percentage: percentageY
          })})`;
          cardInner.style.filter = `brightness(${valueAtPercentage({
            from: 1,
            to: 0.6,
            percentage: percentageY
          })})`;
        });
      }
    });
  }
}
