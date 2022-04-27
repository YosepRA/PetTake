const cloudinary = require('cloudinary').v2;

const { promiseResolver } = require('../utilities/helpers.js');

module.exports = {
  async upload(req, res) {
    const { files } = req;

    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, { folder: 'PetTake' }),
    );

    const [uploadResult, error] = await promiseResolver(
      Promise.all(uploadPromises),
    );

    if (error) {
      return res.json({ success: false, error });
    }

    const uploadData = uploadResult.map((img) => ({
      publicId: img.public_id,
      url: img.secure_url,
    }));

    return res.json({ succesS: true, data: uploadData });
  },
  delete(req, res) {
    res.send('Hello from image delete route.');
  },
};
