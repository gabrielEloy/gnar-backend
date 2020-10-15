const path = require('path');
const basePath = require('../utils/basePath');

const createFilePath = (req, res, next) => {
    const { file } = req.files;

    const filePath = path.join(basePath, '../', 'public', 'uploads', `${new Date().getTime()}_${file.name}`);

    console.log({file, filePath})

    file.mv(filePath, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    })

    req.filePath = filePath;

    next();
}


module.exports = {createFilePath};