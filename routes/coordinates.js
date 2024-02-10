const express = require('express');
const router = express.Router();
const { getCoordinates, addCoordinate, deleteByLabelInstead, updateCoordinateByLabel } = require('../controllers/coordinates');

router
  .route('/')
  .get(getCoordinates)
  .post(addCoordinate);

router
  .route('/:label')
  .delete(deleteByLabelInstead)
  .put(updateCoordinateByLabel);

module.exports = router;
