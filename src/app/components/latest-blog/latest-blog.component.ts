import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-latest-blog',
  templateUrl: './latest-blog.component.html',
  styleUrls: ['./latest-blog.component.css', './latest-blog.component.responsive.css']
})
export class LatestBlogComponent implements AfterViewInit {
  @ViewChild('cardsContainer', { static: false }) cardsContainer!: ElementRef;

  // Dados das cartas
  cards = [
    {
      image: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100',
      title: 'Card Title 1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      image: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100',
      title: 'Card Title 2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      image: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100',
      title: 'Card Title 3',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    }
  ];

  // Função que calcula o valor baseado na porcentagem
  valueAtPercentage({ from, to, percentage }: { from: number, to: number, percentage: number }) {
    return from + (to - from) * percentage;
  }

  // Implementação do ScrollObserver
  ScrollObserver = {
    Element: (element: HTMLElement, options: { offsetTop: number, offsetBottom: number }) => {
      const onScroll = (callback: (data: { percentageY: number }) => void) => {
        const handleScroll = () => {
          const rect = element.getBoundingClientRect();
          const elementHeight = rect.height;
          const offsetTop = options.offsetTop;
          const offsetBottom = options.offsetBottom;
          const elementTop = rect.top + window.scrollY;

          let percentageY = (elementTop - offsetTop) / (window.innerHeight - elementHeight - offsetBottom);
          percentageY = Math.max(0, Math.min(1, percentageY));

          callback({ percentageY });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return { onScroll };
      };

      return { onScroll };
    }
  };

  ngAfterViewInit(): void {
    const cardsContainer = this.cardsContainer.nativeElement;
    const cards: NodeListOf<HTMLElement> = cardsContainer.querySelectorAll('.card');

    cardsContainer.style.setProperty('--cards-count', cards.length.toString());
    cardsContainer.style.setProperty('--card-height', `${cards[0].clientHeight}px`);

    cards.forEach((card, index) => {
      const offsetTop = 20 + index * 20;
      card.style.paddingTop = `${offsetTop}px`;

      if (index === cards.length - 1) return;

      const nextCard = cards[index + 1];
      const cardInner = card.querySelector<HTMLElement>('.card__inner');

      if (nextCard && cardInner) {
        this.ScrollObserver.Element(nextCard, {
          offsetTop,
          offsetBottom: window.innerHeight - card.clientHeight
        }).onScroll(({ percentageY }: { percentageY: number }) => {
          // Mantendo todos os cards do mesmo tamanho
          cardInner.style.transform = `scale(1)`;
          cardInner.style.filter = `brightness(${this.valueAtPercentage({
            from: 1,
            to: 0.6,
            percentage: percentageY
          })})`;
        });
      }
    });
  }
}
