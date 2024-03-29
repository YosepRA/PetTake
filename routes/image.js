const express = require('express');
const multer = require('multer');

const path = require('path');

const controller = require('../controllers/image.js');

const router = express.Router();
const uploadDir = path.join(__dirname, '../public/uploads');

// Multer configuration.
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
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

/* ========== Routes ========== */

router.post('/', upload.array('images'), controller.upload);

router.delete('/', controller.delete);

module.exports = router;
