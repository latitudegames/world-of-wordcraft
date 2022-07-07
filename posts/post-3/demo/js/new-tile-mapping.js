// Mapping from tile name to index or indices to make the code more readable
const TILE_MAPPING = {
  WALL: {
    TOP_LEFT: 946,
    TOP_RIGHT: 948,
    BOTTOM_RIGHT: 1046,
    BOTTOM_LEFT: 1044,
    TOP: [
      { index: 947, weight: 4 },
      { index: [947, 947, 947], weight: 1 },
    ],
    LEFT: [
      { index: 995, weight: 4 },
      { index: [995, 995, 995], weight: 1 },
    ],
    RIGHT: [
      { index: 997, weight: 4 },
      { index: [997, 997, 997], weight: 1 },
    ],
    BOTTOM: [
      { index: 1045, weight: 4 },
      { index: [1045, 1045, 1045], weight: 1 },
    ],
  },
  FLOOR: [
    { index: 901, weight: 9 },
    { index: [898, 899, 900], weight: 1 },
  ],
  POT: [
    { index: 1014, weight: 1 },
    { index: 1015, weight: 1 },
    { index: 1017, weight: 1 },
  ],
  DOOR: {
    TOP: [998, 897, 999],
    // prettier-ignore
    LEFT: [
      [998], 
      [897], 
      [1047]
    ],
    BOTTOM: [1047, 897, 1048],
    // prettier-ignore
    RIGHT: [
      [999], 
      [897], 
      [1048]
    ],
  },
  CHEST: 915,
  STAIRS: 1243,
  // prettier-ignore
  TOWER: [
    [970],
    [1019]
  ],
};

export default TILE_MAPPING;
