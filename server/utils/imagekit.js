const ImageKit = require("imagekit");

const { IMAGEKIT_PK, IMAGEKIT_SK, IMAGEKIT_EP } = process.env;
const imagekit = new ImageKit({
  publicKey: IMAGEKIT_PK,
  privateKey: IMAGEKIT_SK,
  urlEndpoint: IMAGEKIT_EP,
});

module.exports = imagekit;
