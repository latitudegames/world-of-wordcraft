// Mapping from tile name to index or indices to make the code more readable
const TILE_MAPPING = {
  IMAGE: "darkdimension",
  BLANK: 468,
  WALL: {
    TOP_LEFT: 207,
    TOP_RIGHT: 209,
    BOTTOM_RIGHT: 267,
    BOTTOM_LEFT: 265,
    TOP: [
      { index: 208, weight: 4 },
      { index: [208, 208, 208], weight: 1 },
    ],
    LEFT: [
      { index: 236, weight: 4 },
      { index: [236, 236, 236], weight: 1 },
    ],
    RIGHT: [
      { index: 238, weight: 4 },
      { index: [238, 238, 238], weight: 1 },
    ],
    BOTTOM: [
      { index: 266, weight: 4 },
      { index: [266, 266, 266], weight: 1 },
    ],
  },
  FLOOR: [
    { index: 31, weight: 9 },
    { index: [32, 33, 34], weight: 1 },
  ],
  POT: [
    { index: 118, weight: 1 },
    { index: 178, weight: 1 },
    { index: 180, weight: 1 },
  ],
  DOOR: {
    TOP: [210, 31, 211],
    // prettier-ignore
    LEFT: [
      [210], 
      [31], 
      [239]
    ],
    BOTTOM: [239, 31, 240],
    // prettier-ignore
    RIGHT: [
      [211], 
      [31], 
      [240]
    ],
  },
  CHEST: 1051,
  STAIRS: 190,
  // prettier-ignore
  TOWER: [
    [120],
    [149]
  ],
};

export default TILE_MAPPING;
