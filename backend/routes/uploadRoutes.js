import path from 'path';
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/images/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpe?g|png|bmp|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb('Images only!');
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  const newFileNew = `image-${Date.now()}.jpeg`;
  sharp(__dirname + `/${req.file.path}`)
    .jpeg({ quality: 40 })
    .resize(540, 400)
    .toFile(__dirname + `/uploads/images/${newFileNew}`)
    .then(() => {
      fs.unlink(__dirname + `/${req.file.path}`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    });

  res.send(`/uploads/images/${newFileNew}`);
});

export default router;
