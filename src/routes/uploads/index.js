const express = require('express');
const router = express.Router();
const { createFilePath } = require('../../middlewares/createFilePath');
const { deleteCSVFile } = require('../../middlewares/deleteCSVFile');
const { handleCSVUpload, getById } = require('../../controllers/uploads')

router.get('/:id', getById)

router.post('/', createFilePath, handleCSVUpload, deleteCSVFile)

module.exports = router;