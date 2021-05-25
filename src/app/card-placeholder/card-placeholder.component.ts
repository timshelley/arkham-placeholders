import { Component, Input, OnInit } from '@angular/core';
import { ArkhamDBCard } from '../interfaces';

@Component({
  selector: 'app-card-placeholder',
  templateUrl: './card-placeholder.component.html',
  styleUrls: ['./card-placeholder.component.css']
})
export class CardPlaceholderComponent implements OnInit {

  @Input()
  public card: Partial<ArkhamDBCard> = {};

  @Input()
  public orderNumber: number = 1;

  constructor() { }

  public get cardPack(): string {
    let isCore: boolean = this.card?.cycle_details?.code === 'core';
    let isDeluxe: boolean = this.card?.pack_details?.position === 1;
    let isStarter: boolean = this.card?.pack_details?.cycle_position === 60;
    let isReturnTo: boolean = this.card?.pack_details?.name.indexOf('Return to') === 0;

    let packName: string = this.card?.pack_details?.name || '';
    if (isDeluxe) packName = 'Deluxe';
    if (isCore || isReturnTo) packName = '';
    if (isStarter) packName = 'Standalone Investigator';

    return packName;
  }

  public get cardFaction(): string {
    let isDualFaction: boolean = !!this.card?.faction2_code;
    let faction1: string = this.card?.faction_name || '';
    let faction2: string = this.card?.faction2_name || '';
    return (isDualFaction) ? `${faction1} / ${faction2}` : faction1;
  }

  public get quantity(): number {
    return this.card?.quantity || 0;
  }

  public get subname(): string {
    return this.card?.subname || '';
  }

  public get factionImage1(): string {
    let faction1: string = this.card?.faction_code || '';
    if (this.isWeakness()) faction1 = 'weakness';
    return `/assets/factions/${faction1}.svg`;
  }

  public get factionImage2(): string {
    let faction2: string = this.card?.faction2_code || '';
    return faction2 ? `/assets/factions/${faction2}.svg` : '';
  }

  public get cardXp(): number {
    return this.card?.xp || 0;
  }

  public get showCost(): boolean {
    return !this.isWeakness() && !this.isInvestigator();
  }

  public get cardCost(): number {
    return this.card?.cost || 0;
  }

  public get xpStars(): number[] {
    let stars: number[] = [];
    for (let i = 0; i < this.cardXp; i++) {
      stars.push(i);
    }
    return stars;

  }

  public logCard(): void {
    console.log('card details: ', this.card);
  }

  public isWeakness(): boolean {
    return this.card?.subtype_code === 'basicweakness';
  }

  public isInvestigator(): boolean {
    return this.card?.type_code === 'investigator';
  }

  ngOnInit(): void {
  }

}
