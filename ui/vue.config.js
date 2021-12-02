module.exports = {
    devServer: {
      proxy: {
        '/crypto/price': {
          target: 'http://localhost',
          secure: false
        }
      }
    }
  }