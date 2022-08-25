// @ts-ignore
voyage = {
  getGeneration: async function (options) {
    const response = await fetch(`https://api.latitude.io/text/completions_v2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "FIX_ME_API_KEY",
      },
      body: JSON.stringify(options),
    });
    if (response.status === 200) {
      const res = await response.json();
      return res;
    }

    throw new Error(`${response.status}`);
  },
  getClipEmbed: async function (caption) {
    const response = await fetch(
      `https://api.latitude.io/vendor/coreweave/v1/models/clip-encoder/engines/clip-encoder/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "FIX_ME_API_KEY",
        },
        body: JSON.stringify({ text: caption }),
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      return res;
    }

    throw new Error(`${response.status}`);
  },
};
