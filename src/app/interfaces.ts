export interface ArkhamDBPack {
    code: string;
    name: string;
    position: number;
    cycle_position: number;
    available: string;
    known: number;
    total: number;
    id: number;
    url: string;
}

export interface ArkhamDBCard {
    pack_code: string;
    pack_name: string;
    type_code: string;
    type_name: string;
    subtype_code: string;
    subtype_name: string;
    faction_code: string;
    faction_name: string;
    faction2_code: string;
    faction2_name: string;
    position: number;
    exceptional: boolean;
    myriad: boolean;
    code: string;
    name: string;
    real_name: string;
    text: string;
    real_text: string;
    quantity: number;
    health_per_investigator: boolean;
    deck_limit: number;
    traits: string;
    real_traits: string;
    restrictions: { investigator: { [key: string]: string }};
    illustrator: string;
    is_unique: boolean;
    permanent: boolean;
    double_sided: boolean;
    octgn_id: string;
    url: string;
    imagesrc: string;
    xp: number;
    cost: number;
    subname: string;
    
    pack_details?: ArkhamDBPack;
    cycle_details?: ArkhamDBPack;
}

export interface Card {}

export interface InvestigatorCard extends Card {}
export interface AssetCard extends Card {}


export enum CardType {
    ASSET = 'asset',
    ENEMY = 'enemy',
    EVENT = 'event',
    INVESTIGATOR = 'investigator',
    SKILL = 'skill',
    STORY = 'story',
    TREACHERY = 'treachery'
}

export enum Faction {
    GUARDIAN = 'guardian',
    MYSTIC = 'mystic',
    MYTHOS = 'mythos',
    NEUTRAL = 'neutral',
    ROGUE = 'rogue',
    SEEKER = 'seeker',
    SURVIVOR = 'survivor'
}