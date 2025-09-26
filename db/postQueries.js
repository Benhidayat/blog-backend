const prisma = require('./prismaClient');

const fetchPosts = async () => {
    const posts = await prisma.post.findMany();
    return posts;
};

module.exports = {
    fetchPosts
};