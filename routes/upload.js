const { Router } = require('express');
const uploadRouter = Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../client/public/upload'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
});

const upload = multer({ storage });

uploadRouter.post('/', upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename)
});

module.exports = uploadRouter;