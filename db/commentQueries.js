const prisma = require('./prismaClient');

const createComment = async (comment, userId, postId, parentId) => {
    const com = await prisma.comment.create({
        data: {
            comment,
            user: {
                connect: {
                    id: userId
                }
            },
            Post: {
                connect: {
                    id: postId
                }
            },
            ...(parentId ? {parent: {connect: { id: parentId}}} : {})
        },
        include: {
            user: {
                select: {
                    username: true,
                    id: true
                }
            }
        }
    });
    return com
};

const fetchComments = async (postId) => {
    const comments = await prisma.comment.findMany({
        where: {
            postId
        }
    });
    return comments
};

module.exports = {
    createComment,
    fetchComments
};