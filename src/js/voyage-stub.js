voyage = {
  getGeneration: async function(options) {
    const response = await fetch(
      `https://api.latitude.io/text/completions_v2`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': FIX_ME_API_KEY,
        },
        body: JSON.stringify(options),
      }
    )
    if (response.status === 200) {
      return { data: await response.json()}
    }

    throw Exception(response.status)
  }
}
