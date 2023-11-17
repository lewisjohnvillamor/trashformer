const { connectDB } = require('../database');
const { ObjectId, isValidObjectId } = require('mongodb');// Import ObjectId
const Pusher = require('pusher'); // Ensure Pusher is imported

const pusher = new Pusher({
    appId: "1710073",
    key: "2fc8e5c5694fdd28521a",
    secret: "dc32d0b41f143a8b0860",
    cluster: "ap1",
    useTLS: true
});

exports.addComment = async (text, parentId = null) => {
    try {
        const db = await connectDB();
        const collection = db.collection('comments');

        const newComment = {
            text,
            timestamp: new Date()
        };

        // Correctly convert parentId to ObjectId
        if (parentId && ObjectId.isValid(parentId)) {
            newComment.parentId = new ObjectId(parentId);
        } else if (parentId) {
            // Handle invalid parentId
            console.warn("Invalid parentId:", parentId);
            throw new Error("Invalid parentId");
        }

        const result = await collection.insertOne(newComment);
        newComment._id = result.insertedId;

        pusher.trigger('comment-channel', 'new-comment', newComment);

        return newComment;
    } catch (error) {
        console.error("Error in addComment:", error);
        throw error;
    }
};

exports.getComments = async () => {
    const db = await connectDB();
    const collection = db.collection('comments');
    
    const comments = await collection.find({}).toArray();
    
    let commentMap = {};
    comments.forEach(comment => commentMap[comment._id.toString()] = comment); // Convert ObjectId to string

    let nestedComments = [];
    comments.forEach(comment => {
        if (comment.parentId) {
            const parent = commentMap[comment.parentId.toString()];
            parent.replies = parent.replies || [];
            parent.replies.push(comment);
        } else {
            nestedComments.push(comment);
        }
    });

    return nestedComments;
};
