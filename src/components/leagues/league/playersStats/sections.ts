export type StatSection = {
  id: number;
  name: string;
  playerOrd: number[];
};

export const STAT_SECTIONS: StatSection[] = [
  { id: 3, name: "forwards", playerOrd: [3] },
  { id: 2, name: "defenders", playerOrd: [2] },
  { id: 1, name: "goaltending", playerOrd: [1] },
];
