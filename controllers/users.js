const asyncHandler = require('../middleware/asyncHandler');
const { fetchUsers } = require('../db/userQueries');


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await fetchUsers();
    console.log(users)
    res.status(200).json(users);
});

module.exports = getAllUsers;