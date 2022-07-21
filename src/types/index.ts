export type TypeCategory =
  | 'All'
  | 'Food'
  | 'Non_Food'
  | 'Equipment'
  | 'Materials'
  | 'Monsters'
  | 'Treasure';

export type TypeGenericElement = {
  // Common
  category: string;
  common_locations: string[];
  description: string;
  id: number;
  image: string;
  name: string;
  // Creatures : Food
  cooking_effect?: string;
  hearts_recovered?: number;
  // Creatures : Non Food
  drops?: string[];
  // Equipment
  attack?: number;
  defense?: number;
  // Materials (Yet typed)
  //cooking_effect: string;
  //hearts_recovered: number;
  // Monsters (Yet typed)
  //drops: string[];
  // Treasure (Yet typed)
  //drops: string[];
} | null;

export type TypeElementPropPage = {
  cName: string;
  cImgSrc: string;
  cId: number;
};

export type TypeBOTWCompendiumResponseData = {
  data: Data;
};

export type TypeBOTWCompendiumArray = [] | null;

export type TypeCompendiumElement =
  | TypeFood
  | TypeNonFood
  | TypeEquipment
  | TypeMaterials
  | TypeMonsters
  | TypeTreasure;

type Data = {
  creatures: {
    food: TypeFood[];
    non_food: TypeNonFood[];
  };
  equipment: TypeEquipment[];
  materials: TypeMaterials[];
  monsters: TypeMonsters[];
  treasure: TypeTreasure[];
};

export type TypeFood = {
  category: string;
  common_locations: string[];
  cooking_effect: string;
  description: string;
  hearts_recovered: number;
  id: number;
  image: string;
  name: string;
};

type TypeNonFood = {
  category: string;
  common_locations: string[];
  description: string;
  drops: string[];
  id: number;
  image: string;
  name: string;
};

type TypeEquipment = {
  attack: number;
  category: string;
  common_locations: string[];
  defense: number;
  description: string;
  id: number;
  image: string;
  name: string;
};

type TypeMaterials = {
  category: string;
  common_locations: string[];
  cooking_effect: string;
  description: string;
  hearts_recovered: number;
  id: number;
  image: string;
  name: string;
};

type TypeMonsters = {
  category: string;
  common_locations: string[];
  description: string;
  drops: string[];
  id: number;
  image: string;
  name: string;
};

type TypeTreasure = {
  category: string;
  common_locations: string[];
  description: string;
  drops: string[];
  id: number;
  image: string;
  name: string;
};
