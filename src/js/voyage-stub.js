voyage = {
  getGeneration: async function(options) {
    return Promise.resolve({
      data: {
        completions: [{
          text: options.prompt
        }]
      }
    })
  }
}
