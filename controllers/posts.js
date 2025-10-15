const asyncHandler = require('../middleware/asyncHandler');
const {
    fetchPosts,
    fetchSinglePost,
    createPost,
    deletePost
} = require('../db/postQueries');

const getAllPosts = asyncHandler(async (req, res) => {
    const { cat } = req.query;
    const posts = await fetchPosts(cat);
    res.status(200).json(posts);
});

const getSinglePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await fetchSinglePost(Number(id));
    
    res.status(200).json(post);
});

const makePost = asyncHandler(async (req, res) => {
    const { title, content, img, cat, userId } = req.body;
    const post = await createPost(title, content, img, cat, userId);
    res.status(201).json(post);
});

const removePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deletePost(parseInt(id));
    res.status(200).json({ message: 'Post deleted' })

});

module.exports = {
    getAllPosts,
    getSinglePost,
    makePost,
    removePost,
};