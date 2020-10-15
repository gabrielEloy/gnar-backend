const fs = require('fs');
const { Upload, Shift } = require('../database/models');
const readCsvByChunk = require('../utils/readCsvByChunk');

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const uploads = await Upload.findAll({
      attributes: ['id', 'name', 'status'],
      where: {
        id,
      },
      include: [
        {
          attributes: ['id', 'clock_in', 'clock_out', 'yard_id'],
          association: 'shifts',
          include: [{
            attributes: ['name', 'id'],
            association: 'employee',
          }],
        },
      ],
    });

    res.send({ uploads });
  } catch (err) {
    res.status(500).send({ err });
  }
};

const handleCSVUpload = async (req, res, next) => {
  const { body: { fileName: name }, filePath } = req;

  try {
    const readableStream = fs.createReadStream(filePath);

    const upload = await Upload.create({ name, status: 'writing' });
    req.uploadId = upload.id;
    let hasChunkError = false;

    const onChunk = async (chunk) => {
      try {
        await Shift.bulkCreate(chunk.map((row) => ({
          ...row,
          upload_id: upload.id,
        })));
      } catch (err) {
        hasChunkError = true;
      }
    };

    const { errors } = await readCsvByChunk({
      readableStream,
      chunkSize: 3,
      onChunk,
    });

    if (errors.length !== 0) {
      await upload.update({ status: 'failed' });
      res.status(400).send({ failed: true });
      return;
    }

    if (hasChunkError) {
      await upload.update({ status: 'failed' });
      return;
    }

    await upload.update({ status: 'written' });
    next();
  } catch (err) {
    res.status(500).send({ err });
  }
};

module.exports = {
  handleCSVUpload,
  getById,
};
