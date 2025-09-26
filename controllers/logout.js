const asyncHandler = require('../middleware/asyncHandler');
const {
    fetchUserByRefreshToken,
    removeTokenFromUser
} = require('../db/userQueries');

const logout = asyncHandler(async (req, res) => {
    const { cookies } = req;
    if (!cookies.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    // Check if the refreshToken belongs to a user
    const foundUser = await fetchUserByRefreshToken(refreshToken);
    // if there was no user found
    if (!foundUser) {
        res.clearCookie(
            'jwt',
            {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',

            }
        )
        return res.sendStatus(204);
    }

    // remove the refreshToken from the user
    const user = await removeTokenFromUser(foundUser.id);

    res.clearCookie('jwt', { httpOnly: true, secure: false, sameSite: 'lax' });
    res.status(204).json({message: 'User logged out'});
});

module.exports = logout;