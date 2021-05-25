import { Component, Input, OnInit } from '@angular/core';
import { ArkhamDBCard } from '../interfaces';

interface PagedCards {
  cards: PaginatedCard[]
}

interface PaginatedCard extends ArkhamDBCard {
  order?: number;
  copies?: number;
}

@Component({
  selector: 'app-card-placeholders',
  templateUrl: './card-placeholders.component.html',
  styleUrls: ['./card-placeholders.component.css']
})
export class CardPlaceholdersComponent implements OnInit {

  @Input()
  public idealQuantity: number = 2;

  @Input()
  public maxQuantity: number = 3;

  @Input()
  public cardsPerPage: number = 9;

  @Input()
  public cards: ArkhamDBCard[] = [];

  constructor() { }

  public get paginatedCards(): PagedCards[] {

    // insert a counter
    let orderedCards: PaginatedCard[] = this.cards?.map((card, index) => {
      let paginatedCard: PaginatedCard = {...card};
      paginatedCard.order = index;

      if (paginatedCard.quantity <= this.idealQuantity || paginatedCard.quantity <= this.maxQuantity) { 
        paginatedCard.copies = 1;
      } else {
        paginatedCard.copies = card.quantity / Math.ceil(this.idealQuantity)
      }

      return paginatedCard;
    });

    let itemsToDuplicate: PaginatedCard[] = orderedCards.filter((card) => (card?.copies ?? 0) > 1);
    itemsToDuplicate.forEach((card) => {
      let duplicateCopies: PaginatedCard[] = [];
      let copies: number = card?.copies || 0;
      for(let i: number = 1; i < copies; i++) {
        orderedCards.push({...card})
      }
    });

    orderedCards.sort((a, b) => (a.order ?? 0) > (b.order ?? 0) ? 1 : -1);

    let pages: PagedCards[] = [];
    orderedCards.forEach((card, index) => {
        let isNewPage = index % this.cardsPerPage === 0;
        let page = (isNewPage) ? { cards: [] } : pages.pop();
        page?.cards.push(card);
        pages.push(page as any);
    });

    // console.log('pages: ', pages);
    return pages;

    // return orderedCards;
  }

  ngOnInit(): void {
  }

}
