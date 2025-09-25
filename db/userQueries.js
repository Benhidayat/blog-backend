const prisma = require('./prismaClient');

const createUser = async (username, email, password) => {
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password
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

module.exports = {
    createUser,
    fetchUsers,
    fetchUserByUsername,
    fetchUserByEmail
};