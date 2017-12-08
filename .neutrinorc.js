module.exports = {
  options: {
    output: 'public',
  },
  use: [
    ['neutrino-preset-react', {
      devServer: { port: 5010 }
    }]
  ],
};
