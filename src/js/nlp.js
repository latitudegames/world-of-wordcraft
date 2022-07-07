
const calibrationVals = [1/9.5752592086792, 1/5.215957156615332, 1/7.2687482833862305, 1/9.043849766254425, 1/4.890042215585709];
const roomTypes = ['egypt', 'atlantis', 'cloud', 'aztec', 'darkdimension'];
export const getRoomType = async (textVal) => {
    // TODO (mitchg) this is kind of hacky, but we need to know how many tokens the prompt is
    const prompt = `Room Description: a watery dungeon 
Room Type: atlantis

Room Description: a sandy tomb
Room Type: egypt

Room Description: heaven with angels
Room Type: clouds

Room Description: earthy, jungle temple
Room Type: aztec

Room Description: murky crystal maze
Room Type: darkdimension

Room Description: ${textVal}
Room Type:`;
  const res = await voyage.getGeneration({prompt, model: 'aid-grande', length: 0 });
  const promptLen = res.data.prompt.tokens.length;
  const logprobs = await Promise.all(roomTypes.map(async (room, idx) => {
    const res = await voyage.getGeneration({prompt: prompt + ` ${room}`, model: 'aid-grande', length: 0 });
    const tokens = res.data.prompt.tokens;
    console.log(tokens.slice(promptLen));
    return tokens.slice(promptLen).reduce((acc, next) => acc + next.generatedToken.logprob, 0) * calibrationVals[idx];
  }))
  console.log(logprobs)
  return roomTypes[logprobs.indexOf(Math.max(...logprobs))];
}
