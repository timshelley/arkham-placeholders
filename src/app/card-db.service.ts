import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import ArkhamDBRawCards from './data/arkhamdb-data.json';
import ArkhamDBRawPacks from './data/arkhamdb-packs.json';
import { ArkhamDBCard, ArkhamDBPack } from './interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardDBService {

  private loadFromArkhamDB(): Observable<ArkhamDBCard[]> {
    return this.http.get<ArkhamDBCard[]>('https://arkhamdb.com/api/public/cards/')
      .pipe(
        map((cards) => {

          return cards;
        })
      );
  }

  private transformCards(rawCards: ArkhamDBCard[], rawPacks: ArkhamDBPack[]): ArkhamDBCard[] {
    // Duplicating items with multiple factions
    let multiFactionCards = rawCards
      .filter((card: ArkhamDBCard) => card.faction2_code)
      .map((card: ArkhamDBCard) => {
        let clone = { ...card };
        clone.faction_code = card.faction2_code;
        clone.faction_name = card.faction2_name;

        clone.faction2_code = card.faction_code;
        clone.faction2_name = card.faction_name;
        return clone;
      });

    // Duplicating investigator cards for signature cards
    let signatureCards = rawCards
      .filter((card: ArkhamDBCard) => card.type_code === 'investigator')
      .map((card: ArkhamDBCard) => {
        let signatureCard = { ...card };
        signatureCard.subname = 'Signature Card';
        return signatureCard;
      });

    let signatureWeaknesses = rawCards
      .filter((card: ArkhamDBCard) => card.type_code === 'investigator')
      .map((card: ArkhamDBCard) => {
        let signatureWeakness = { ...card };
        signatureWeakness.subname = 'Signature Weakness';
        signatureWeakness.subtype_code = 'basicweakness';

        return signatureWeakness;
      });

    return rawCards
      .concat(multiFactionCards)
      .concat(signatureCards)
      .concat(signatureWeaknesses)
      .filter((card: ArkhamDBCard) => card.name !== 'Random Basic Weakness')
      .map((card: ArkhamDBCard) => {
        let packDetails: ArkhamDBPack = rawPacks.find((p: ArkhamDBPack) => p.code === card.pack_code) || ({} as any);
        console.log('packDetails: ', packDetails);
        let cycleDetails: ArkhamDBPack = rawPacks.find((p: ArkhamDBPack) => {
          if (p.cycle_position === 80) {
            // Use the "promo" pack as the base cycle
            return p.cycle_position === packDetails.cycle_position && p.position === 30;
          } else {
            return p.cycle_position === packDetails.cycle_position && p.position === 1;
          }
        })  || ({} as any);

        let isCycleInvestigators: boolean = packDetails.cycle_position === 60;
        let isCycleReturnTo: boolean = packDetails.name.indexOf('Return to') === 0;
        if (isCycleInvestigators || isCycleReturnTo) cycleDetails = packDetails;
        
        // Duplicate the number of items to reflect two cores
        if (card.pack_code === 'core') card.quantity = card.quantity * 2;

        if (!card.xp) card.xp = 0;

        card.pack_details = packDetails;
        card.cycle_details = cycleDetails;
        return card;
      });
  }

  constructor(
    private http: HttpClient
  ) { }

  // public getCards(): Observable<ArkhamDBCard[]> {
  //   return null;
  // }

  public get cards(): ArkhamDBCard[] {

    return this.transformCards(
      (ArkhamDBRawCards as any),
      (ArkhamDBRawPacks as any)
    );

    // // Duplicating items with multiple factions
    // let multiFactionCards = (ArkhamDBRawCards as any)
    //   .filter((card: ArkhamDBCard) => card.faction2_code)
    //   .map((card: ArkhamDBCard) => {
    //     let clone = { ...card };
    //     clone.faction_code = card.faction2_code;
    //     clone.faction_name = card.faction2_name;

    //     clone.faction2_code = card.faction_code;
    //     clone.faction2_name = card.faction_name;
    //     return clone;
    //   });

    // // Duplicating investigator cards for signature cards
    // let signatureCards = (ArkhamDBRawCards as any)
    //   .filter((card: ArkhamDBCard) => card.type_code === 'investigator')
    //   .map((card: ArkhamDBCard) => {
    //     let signatureCard = { ...card };
    //     signatureCard.subname = 'Signature Card';
    //     return signatureCard;
    //   });

    // let signatureWeaknesses = (ArkhamDBRawCards as any)
    //   .filter((card: ArkhamDBCard) => card.type_code === 'investigator')
    //   .map((card: ArkhamDBCard) => {
    //     let signatureWeakness = { ...card };
    //     signatureWeakness.subname = 'Signature Weakness';
    //     signatureWeakness.subtype_code = 'basicweakness';

    //     return signatureWeakness;
    //   });

    // return (ArkhamDBRawCards as any)
    //   .concat(multiFactionCards)
    //   .concat(signatureCards)
    //   .concat(signatureWeaknesses)
    //   .filter((card: ArkhamDBCard) => card.name !== 'Random Basic Weakness')
    //   .map((card: ArkhamDBCard) => {
    //     let packDetails: ArkhamDBPack = (ArkhamDBRawPacks as any).find((p: ArkhamDBPack) => p.code === card.pack_code);
    //     let cycleDetails: ArkhamDBPack = (ArkhamDBRawPacks as any).find((p: ArkhamDBPack) => {
    //       return p.cycle_position === packDetails.cycle_position && p.position === 1;
    //     });

    //     let isCycleInvestigators: boolean = packDetails.cycle_position === 60;
    //     let isCycleReturnTo: boolean = packDetails.name.indexOf('Return to') === 0;
    //     if (isCycleInvestigators || isCycleReturnTo) cycleDetails = packDetails;
        
    //     // Duplicate the number of items to reflect two cores
    //     if (card.pack_code === 'core') card.quantity = card.quantity * 2;

    //     if (!card.xp) card.xp = 0;

    //     card.pack_details = packDetails;
    //     card.cycle_details = cycleDetails;
    //     return card;
    //   });
    }
}
