const prisma = require('./prismaClient');

const fetchPosts = async (cat) => {
    const posts = await prisma.post.findMany({
        where: cat ? { cat } : {}
    });
    return posts;
};

const fetchSinglePost = async (id) => {
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                }
            },
            comments: {
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    // replies: {
                    //     include: {
                    //         user: {
                    //             select: {
                    //                 id: true,
                    //                 username: true
                    //             }
                    //         }
                    //     }
                    // }
                }
            }
        }
    });

    return post;
};

const createPost = async (title, content, img, cat, userId ) => {
    const post = await prisma.post.create({
        data: {
            title,
            content,
            img,
            cat,
            author: {
                connect: {
                    id: userId
                }
            }
        }
    });
    return post;
};

const deletePost = async (id) => {
    await prisma.post.delete({
        where: { id }
    });
};

const updatePost = async (id, data) => {
   //
};

module.exports = {
    fetchPosts,
    fetchSinglePost,
    deletePost,
    createPost
};