/* eslint implicit-arrow-linebreak: ["error", "below"] */

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

    return res.json({ success: true, data: uploadData });
  },
  async delete(req, res) {
    const { publicId } = req.body;

    const [deleteResult, error] = await promiseResolver(
      cloudinary.uploader.destroy(publicId),
    );

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.json({ success: true });
  },
};
