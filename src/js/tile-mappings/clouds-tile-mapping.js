// Mapping from tile name to index or indices to make the code more readable
const TILE_MAPPING = {
  IMAGE: "clouds",
  BLANK: 92,
  WALL: {
    TOP_LEFT: 361,
    TOP_RIGHT: 363,
    BOTTOM_RIGHT: 453,
    BOTTOM_LEFT: 451,
    TOP: [
      { index: 362, weight: 4 },
      { index: [362, 362, 362], weight: 1 },
    ],
    LEFT: [
      { index: 406, weight: 4 },
      { index: [406, 406, 406], weight: 1 },
    ],
    RIGHT: [
      { index: 408, weight: 4 },
      { index: [408, 408, 408], weight: 1 },
    ],
    BOTTOM: [
      { index: 452, weight: 4 },
      { index: [452, 452, 452], weight: 1 },
    ],
  },
  FLOOR: [
    { index: 367, weight: 9 },
    { index: [368, 369, 370], weight: 1 },
  ],
  POT: [
    { index: 933, weight: 1 },
    { index: 978, weight: 1 },
    { index: 933, weight: 1 },
  ],
  DOOR: {
    TOP: [364, 367, 365],
    // prettier-ignore
    LEFT: [
      [364], 
      [367], 
      [409]
    ],
    BOTTOM: [409, 367, 410],
    // prettier-ignore
    RIGHT: [
      [365], 
      [367], 
      [410]
    ],
  },
  CHEST: 1051,
  STAIRS: 778,
  // prettier-ignore
  TOWER: [
    [877],
    [922]
  ],
};

export default TILE_MAPPING;
