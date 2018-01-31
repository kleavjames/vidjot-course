if(process.env.NODE_ENV === 'production') {
  module.exports = {mongoURI: 'mongodb://kleavant:kleavant@ds257077.mlab.com:57077/vidjot-prod'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}