const fs = require('fs');

module.exports.deleteCSVFile = (req, res, next) => {
    const { filePath } = req;

    fs.unlinkSync(filePath)

    res.send({success:true})
}
