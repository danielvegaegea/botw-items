export type Category =
  | 'food'
  | 'non_food'
  | 'equipment'
  | 'materials'
  | 'monsters'
  | 'treasure';

export type BOTWCompendiumResponseData = {
  data: Data;
};

export type BOTWCompendiumArray = [];

type Data = {
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
