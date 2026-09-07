export interface Tournament {
  id: number;
  name: string;
  typeId?: number;
  northAmericaLeagues?: number[];
}

export const tournaments: Tournament[] = [
  { id: 0, name: "Europe", typeId: 1, northAmericaLeagues: [14, 15] },
  { id: 1, name: "North America", northAmericaLeagues: [14, 15] },
  { id: 2, name: "International", typeId: 2 },
];
