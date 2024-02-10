const Coordinate = require('../models/Coordinate');

// @desc    Get all coordinates
// @route   GET /api/v1/coordinates
// @access  Public
exports.getCoordinates = async (req, res, next) => {
  try {
    const coordinates = await Coordinate.find();

    return res.status(200).json({
      success: true,
      count: coordinates.length,
      data: coordinates
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add coordinate
// @route   POST /api/v1/coordinates
// @access  Public
exports.addCoordinate = async (req, res, next) => {
  try {
    const { xCoordinate, yCoordinate, label } = req.body;

    const coordinate = await Coordinate.create(req.body);
  
    return res.status(201).json({
      success: true,
      data: coordinate
    }); 
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

// @desc    Delete coordinate
// @route   DELETE /api/v1/coordinates/:id
// @access  Public
exports.deleteByLabelInstead = async (req, res, next) => {
  try {
    const { label } = req.params;

    console.log(req.params);

    const coordinate = await Coordinate.findOneAndDelete({ label });

    if (!coordinate) {
      return res.status(404).json({
        success: false,
        error: 'No coordinate found with the provided label'
      });
    }

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}


// @desc    Update coordinate
// @route   PUT /api/v1/coordinates/:id
// @access  Public
exports.updateCoordinateByLabel = async (req, res, next) => {
  try {
    const { xCoordinate, yCoordinate, label } = req.body;

    let coordinate = await Coordinate.findOneAndUpdate(
      { label: req.params.label },
      { xCoordinate, yCoordinate, label },
      { new: true, runValidators: true }
    );

    if (!coordinate) {
      return res.status(404).json({
        success: false,
        error: 'Coordinate not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: coordinate
    });
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

