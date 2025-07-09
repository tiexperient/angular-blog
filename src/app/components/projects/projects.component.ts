import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { dataFake } from 'src/app/dados/dataFake';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', './projects.component.responsive.css']
})
export class ProjectsComponent implements AfterViewInit, OnInit {
  @ViewChild('cardsContainer', { static: false }) cardsContainer!: ElementRef;

  // Lista de cards filtrados
  cards: any[] = [];

  ngOnInit(): void {
    // Filtrando apenas os registros com status "projects"
    this.cards = dataFake.filter(item => item.projects === "yes").map(item => ({
      image: item.photoCover,
      title: item.title,
      resume: item.resume,
      time: item.time,
      id: item.id
    }));
  }

  valueAtPercentage({ from, to, percentage }: { from: number, to: number, percentage: number }) {
    return from + (to - from) * percentage;
  }

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
    cardsContainer.style.setProperty('--card-height', `${cards[0]?.clientHeight || 0}px`);

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
