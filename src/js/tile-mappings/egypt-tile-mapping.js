// Mapping from tile name to index or indices to make the code more readable
const TILE_MAPPING = {
  IMAGE: "ruineddungeons",
  BLANK: 934,
  WALL: {
    TOP_LEFT: 837,
    TOP_RIGHT: 836,
    BOTTOM_RIGHT: 787,
    BOTTOM_LEFT: 788,
    TOP: [
      { index: 983, weight: 4 },
      { index: [983, 983, 983], weight: 1 },
    ],
    LEFT: [
      { index: 935, weight: 4 },
      { index: [935, 935, 935], weight: 1 },
    ],
    RIGHT: [
      { index: 933, weight: 4 },
      { index: [933, 933, 933], weight: 1 },
    ],
    BOTTOM: [
      { index: 885, weight: 4 },
      { index: [885, 885, 885], weight: 1 },
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
    TOP: [984, 898, 982],
    // prettier-ignore
    LEFT: [
      [984], 
      [898], 
      [886]
    ],
    BOTTOM: [886, 898, 884],
    // prettier-ignore
    RIGHT: [
      [982], 
      [898], 
      [884]
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
