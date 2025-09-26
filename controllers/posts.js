const asyncHandler = require('../middleware/asyncHandler');
const CustomError = require('../configs/customError');
const {
    fetchPosts
} = require('../db/postQueries');

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await fetchPosts();
    res.status(200).json(posts);
});

module.exports = {
    getAllPosts
};