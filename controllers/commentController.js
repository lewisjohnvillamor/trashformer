const commentService = require('../services/commentService');

exports.addComment = async (req, res) => {
    try {
        console.log("Received comment data:", req.body);
        const { text, parentId } = req.body;
        const newComment = await commentService.addComment(text, parentId);
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).send({ message: 'Error adding comment' });
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await commentService.getComments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving comments' });
    }
};
