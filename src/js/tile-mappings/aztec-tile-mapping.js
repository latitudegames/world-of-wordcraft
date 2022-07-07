// Mapping from tile name to index or indices to make the code more readable
const TILE_MAPPING = {
  IMAGE: "ruineddungeons",
  BLANK: 1865,
  WALL: {
    TOP_LEFT: 1768,
    TOP_RIGHT: 1767,
    BOTTOM_RIGHT: 1718,
    BOTTOM_LEFT: 1719,
    TOP: [
      { index: 1914, weight: 4 },
      { index: [1914, 1914, 1914], weight: 1 },
    ],
    LEFT: [
      { index: 1866, weight: 4 },
      { index: [1866, 1866, 1866], weight: 1 },
    ],
    RIGHT: [
      { index: 1864, weight: 4 },
      { index: [1864, 1864, 1864], weight: 1 },
    ],
    BOTTOM: [
      { index: 1816, weight: 4 },
      { index: [1816, 1816, 1816], weight: 1 },
    ],
  },
  FLOOR: [
    { index: 1780, weight: 9 },
    { index: [1781, 1782, 1783], weight: 1 },
  ],
  POT: [
    { index: 1847, weight: 1 },
    { index: 1848, weight: 1 },
    { index: 1850, weight: 1 },
  ],
  DOOR: {
    TOP: [1915, 1780, 1913],
    // prettier-ignore
    LEFT: [
      [1915], 
      [1780], 
      [1817]
    ],
    BOTTOM: [1817, 1780, 1815],
    // prettier-ignore
    RIGHT: [
      [1913], 
      [1780], 
      [1815]
    ],
  },
  CHEST: 2192,
  STAIRS: 2174,
  // prettier-ignore
  TOWER: [
    [1803],
    [1852]
  ],
};

export default TILE_MAPPING;
