import { Injectable } from '@angular/core';
import ArkhamDBRawCards from './data/arkhamdb-data.json';
import ArkhamDBRawPacks from './data/arkhamdb-packs.json';
import { ArkhamDBCard, ArkhamDBPack } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardDBService {

  constructor() { }

  public get cards(): ArkhamDBCard[] {

    // Duplicating items with multiple factions
    let multiFactionCards = (ArkhamDBRawCards as any)
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
    let signatureCards = (ArkhamDBRawCards as any)
      .filter((card: ArkhamDBCard) => card.type_code === 'investigator')
      .map((card: ArkhamDBCard) => {
        let signatureCard = { ...card };
        signatureCard.subname = 'Signature Card';
        return signatureCard;
      });

    let signatureWeaknesses = (ArkhamDBRawCards as any)
      .filter((card: ArkhamDBCard) => card.type_code === 'investigator')
      .map((card: ArkhamDBCard) => {
        let signatureWeakness = { ...card };
        signatureWeakness.subname = 'Signature Weakness';
        signatureWeakness.subtype_code = 'basicweakness';

        return signatureWeakness;
      });

    return (ArkhamDBRawCards as any)
      .concat(multiFactionCards)
      .concat(signatureCards)
      .concat(signatureWeaknesses)
      .filter((card: ArkhamDBCard) => card.name !== 'Random Basic Weakness')
      .map((card: ArkhamDBCard) => {
        let packDetails: ArkhamDBPack = (ArkhamDBRawPacks as any).find((p: ArkhamDBPack) => p.code === card.pack_code);
        let cycleDetails: ArkhamDBPack = (ArkhamDBRawPacks as any).find((p: ArkhamDBPack) => {
          return p.cycle_position === packDetails.cycle_position && p.position === 1;
        });

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
}
