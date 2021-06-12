const express = require('express');
const multer = require('multer');
const path = require('path');
const fsPromises = require('fs').promises;

const router = express.Router();

// Multer configuration.
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename(req, file, cb) {
    const filename = file.originalname.replace(/\s/g, '_');

    cb(null, `${Date.now()}-${filename}`);
  },
});
const imageFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return cb(new Error('Only images are allowed'));
  }
  cb(null, true);

  return undefined;
};
const upload = multer({ storage, fileFilter: imageFilter });

// ===== Routes =====

// Upload image.
router.post('/', upload.array('images'), async (req, res) => {
  const { files } = req;

  res.send(
    files.map(({ filename }) => ({
      filename,
      path: `/uploads/${filename}`,
    })),
  );
});

// Delete image.
router.delete('/', async (req, res) => {
  try {
    const { filename } = req.body;

    await fsPromises.unlink(`./public/uploads/${filename}`);

    res.json({ success: true });
  } catch (error) {
    res.status(404).send('Image is not found.');
  }
});

module.exports = router;
