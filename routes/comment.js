const Router = require('express');
const Comment = require('../models/comment');

const router = Router();

router.post('/addComment/:blogId', async (req, res, next) => {
    const { content } = req.body;

    const comment = await Comment.create({
        content,
        createdBy: req.user._id,
        blogId: req.params.blogId
    });
    console.log(comment);
    return res.json({ message: 'Comment added Successfully' });
});

router.post('/getComments', async (req, res, next) => {
    const { createdBy, blogId } = req.body;
    const comments = await Comment.find({
        createdBy, blogId
    });
    return res.json({ comment: comments });
});

module.exports = router;