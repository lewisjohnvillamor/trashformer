const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');

router.post('/', commentController.addComment); // Route to add a new comment
router.get('/', commentController.getComments); // Route to get all comment

module.exports = router;
