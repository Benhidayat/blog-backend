const prisma = require('./prismaClient');

const createUser = async (username, email, password, role) => {
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password,
            role: role || 'USER' 
        }
    });
    return user;
};

const fetchUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
};

const fetchUserByUsername = async (username) => {
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });
    return user;
};

const fetchUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    return user;
};

const updateUserRefreshToken = async (id, token) => {
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            refreshToken: token
        }
    });
    return user;
};

const fetchUserByRefreshToken = async (token) => {
    const user = await prisma.user.findFirst({
        where: {
            refreshToken: token
        }
    });
    return user;
};

const removeTokenFromUser = async (id) => {
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            refreshToken: null
        }
    });
};

const deleteUser = async (id) => {
    const deletedUser = await prisma.user.delete({
        where: { id },
    });
    return deleteUser;
};

module.exports = {
    createUser,
    fetchUsers,
    fetchUserByUsername,
    fetchUserByEmail,
    updateUserRefreshToken,
    fetchUserByRefreshToken,
    removeTokenFromUser,
    deleteUser,
};