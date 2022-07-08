// Mapping from tile name to index or indices to make the code more readable
const TILE_MAPPING = {
  IMAGE: "ruineddungeons",
  BLANK: 468,
  WALL: {
    TOP_LEFT: 102,
    TOP_RIGHT: 101,
    BOTTOM_RIGHT: 52,
    BOTTOM_LEFT: 53,
    TOP: [
      { index: 248, weight: 4 },
      { index: [248, 248, 248], weight: 1 },
    ],
    LEFT: [
      { index: 200, weight: 4 },
      { index: [200, 200, 200], weight: 1 },
    ],
    RIGHT: [
      { index: 198, weight: 4 },
      { index: [198, 198, 198], weight: 1 },
    ],
    BOTTOM: [
      { index: 150, weight: 4 },
      { index: [150, 150, 150], weight: 1 },
    ],
  },
  FLOOR: [
    { index: 162, weight: 9 },
    { index: [163, 164, 165], weight: 1 },
  ],
  POT: [
    { index: 181, weight: 1 },
    { index: 182, weight: 1 },
    { index: 184, weight: 1 },
  ],
  DOOR: {
    TOP: [249, 162, 247],
    // prettier-ignore
    LEFT: [
      [249], 
      [162], 
      [151]
    ],
    BOTTOM: [151, 162, 149],
    // prettier-ignore
    RIGHT: [
      [247], 
      [162], 
      [149]
    ],
  },
  CHEST: 82,
  STAIRS: 508,
  // prettier-ignore
  TOWER: [
    [625],
    [674]
  ],
  // prettier-ignore
  POND: [
    [
      [173], 
      [222], 
      [271]
    ]
  ,
    [
      [174], 
      [223], 
      [272]
    ]
  ,
    [
      [175], 
      [224], 
      [273]
    ]
  ],
};

export default TILE_MAPPING;
