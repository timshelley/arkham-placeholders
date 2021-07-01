import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CardDBService } from './card-db.service';
import { CycleChange } from './cycle-toggle/cycle-toggle.component';
import { FactionChange } from './faction-toggle/faction-toggle.component';
import { ArkhamDBCard } from './interfaces';
import { TypeChange } from './type-toggle/type-toggle.component';

export interface CardFilter {
  factions: string[];
  cycles: string[];
  types: string[];
  subtypes: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public cards$: Observable<ArkhamDBCard[]>;
  public cardFilter$: BehaviorSubject<CardFilter> = new BehaviorSubject({ 
    factions: ['neutral'], 
    cycles: ['core'],
    types: ['weakness'],
    subtypes: ['']
  });

  constructor(
    private cardService: CardDBService
  ) {

    this.cards$ = of(this.cardService.cards)
      .pipe(
        mergeMap((cards) => {
          return this.cardFilter$.pipe(
            map((filters: CardFilter) => {
              // console.log('new cycle filter: ', filters, cards);
              return cards
                .filter((c) => filters.cycles.includes(c.cycle_details?.code ?? ''))
                .filter((c) => filters.factions.includes(c.faction_code))
                .filter((c) => {
                  // console.log('cards after cycle and faction: ', c);
                  let showWeaknesses: boolean = filters.types.includes('weakness');
                  let cardHasSubType: boolean = !!c.subtype_code;

                  // console.log('showWeaknesses', showWeaknesses, 'hasSubType:', cardHasSubType, 'subtype: ', c.subtype_code);

                  if (cardHasSubType && showWeaknesses) {
                    let matchesType: boolean = ['event', 'skill', 'asset', 'treachery', 'enemy'].concat(filters.types).includes(c.type_code);
                    let matchesSubType: boolean = ['basicweakness', 'weakness'].includes(c.subtype_code);
                    // console.log('matchesType: ', matchesType, 'matchesSubType: ', matchesSubType, c.type_code);
                    return (matchesType && matchesSubType);
                  } else {
                    console.log('matching non-weakness', c.type_code, filters.types)

                    return filters.types.includes(c.type_code);
                  }
                })
                // Filter out any "side b" cards (aka Sophies weakness from Mark's deck)
                .filter((c) => c.code.indexOf('b') === -1)
                // Filter out any cards that have restrictions (like investigator specific cards)
                .filter((c) => !c.restrictions)
            })
          )
        }),
        map((cards) => {
            return cards
              .sort((a, b) => {
                  if (a.faction_code < b.faction_code) return -1;
                  if (a.faction_code > b.faction_code) return 1;

                  if (a.xp < b.xp) return -1;
                  if (a.xp > b.xp) return 1;

                  if ((a.pack_details?.cycle_position ?? 0) < (b.pack_details?.cycle_position ?? 0)) return -1;
                  if ((a.pack_details?.cycle_position ?? 0) > (b.pack_details?.cycle_position ?? 0)) return 1;

                  if ((a.pack_details?.position ?? 0) < (b.pack_details?.position ?? 0)) return -1;
                  if ((a.pack_details?.position ?? 0) > (b.pack_details?.position ?? 0)) return 1;

                  return 0;
              })
        }),
      );

  }

  public factionChange(event: FactionChange): void {
    let filter: CardFilter = this.cardFilter$.value;
    filter.factions = event.value;
    this.cardFilter$.next(filter);
  }

  public cycleChange(event: CycleChange): void {
    let filter: CardFilter = this.cardFilter$.value;
    filter.cycles = event.value;
    this.cardFilter$.next(filter);
  }

  public typeChange(event: TypeChange): void {
    let filter: CardFilter = this.cardFilter$.value;
    filter.types = event.value;
    this.cardFilter$.next(filter);
  }
}
