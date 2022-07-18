export type T_Category =
  | 'All'
  | 'Food'
  | 'Non_Food'
  | 'Equipment'
  | 'Materials'
  | 'Monsters'
  | 'Treasure';

export type T_ElementPropPage = {
  c_name: string;
  c_imgSrc: string;
  c_id: number;
};

export type T_BOTWCompendiumResponseData = {
  data: Data;
};

export type T_BOTWCompendiumArray = [] | null;

export type T_CompendiumElement =
  | T_Food
  | T_NonFood
  | T_Equipment
  | T_Materials
  | T_Monsters
  | T_Treasure;

type Data = {
  creatures: {
    food: T_Food[];
    non_food: T_NonFood[];
  };
  equipment: T_Equipment[];
  materials: T_Materials[];
  monsters: T_Monsters[];
  treasure: T_Treasure[];
};

type T_Food = {
  category: string;
  common_locations: string[];
  cooking_effect: string;
  description: string;
  hearts_recovered: number;
  id: number;
  image: string;
  name: string;
};

type T_NonFood = {
  category: string;
  common_locations: string[];
  description: string;
  drops: string[];
  id: number;
  image: string;
  name: string;
};

type T_Equipment = {
  attack: number;
  category: string;
  common_locations: string[];
  defense: number;
  description: string;
  id: number;
  image: string;
  name: string;
};

type T_Materials = {
  category: string;
  common_locations: string[];
  cooking_effect: string;
  description: string;
  hearts_recovered: number;
  id: number;
  image: string;
  name: string;
};

type T_Monsters = {
  category: string;
  common_locations: string[];
  description: string;
  drops: string[];
  id: number;
  image: string;
  name: string;
};

type T_Treasure = {
  category: string;
  common_locations: string[];
  description: string;
  drops: string[];
  id: number;
  image: string;
  name: string;
};

/* export type Category =
  | 'food'
  | 'non_food'
  | 'equipment'
  | 'materials'
  | 'monsters'
  | 'treasure';

export type BOTWCompendiumResponseData = {
  creatures: {
    food: Food[];
    non_food: NonFood[];
  };
  equipment: Equipment[];
  materials: Material[];
  monsters: Monster[];
  treasure: Treasure[];
};

type Food = {
  category: string;
  common_locations: string[];
  cooking_effect: string;
  description: string;
  hearts_recovered: number;
  id: number;
  image: string;
  name: string;
};

type NonFood = {
  category: string;
  common_locations: string[];
  description: string;
  drops: string[];
  id: number;
  image: string;
  name: string;
};

type Equipment = {
  attack: number;
  category: string;
  common_locations: string[];
  defense: number;
  description: string;
  id: number;
  image: string;
  name: string;
};

type Material = {
  category: string;
  common_locations: string[];
  cooking_effect: string;
  description: string;
  hearts_recovered: number;
  id: number;
  image: string;
  name: string;
};

type Monster = {
  category: string;
  common_locations: string[];
  description: string;
  drops: string[];
  id: number;
  image: string;
  name: string;
};

type Treasure = {
  category: string;
  common_locations: string[];
  description: string;
  drops: string[];
  id: number;
  image: string;
  name: string;
};
 */
