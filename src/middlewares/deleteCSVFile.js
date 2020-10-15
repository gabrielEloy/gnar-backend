const fs = require('fs');

module.exports.deleteCSVFile = (req, res) => {
  const { filePath, uploadId } = req;

  fs.unlinkSync(filePath);

  res.send({
    success: true,
    uploadId,
  });
};
