import { clipEmbeds } from "./clip-embeds.js";

const dot = (a, b) => a.map((_, i) => a[i] * b[i]).reduce((m, n) => m + n);

const roomTypes = ["egypt", "atlantis", "clouds", "aztec", "darkdimension"];
export const getRoomType = async (textVal) => {
  const res = await voyage.getClipEmbed(textVal);
  const scores = roomTypes.map((room) => dot(res.text_embed, clipEmbeds[room]));
  const maxIdx = scores.indexOf(Math.max(...scores));
  return roomTypes[maxIdx];
};
