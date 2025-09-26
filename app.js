const express = require('express');
const app = express();
const PORT = process.env.PORT || 8800;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logsHandler');
const credentials = require('./middleware/credentials');
const corsOptions = require('./configs/corsOptions');
const { notFoundError, errorHandler } = require('./middleware/errorHandler');
const usersRouter = require('./routes/users');
const authRouters = require('./routes/auth');
const postRouters = require('./routes/posts');
const verifyJWt = require('./middleware/verifyJWT');

/** CUSTOM LOGGER */
app.use(logger);

/** CREDENTIALS */
app.use(credentials)

/** CORS */
app.use(cors(corsOptions))

/** COOKIE PARSER */
app.use(cookieParser());

// BODY REQUEST PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** ROUTES */
app.get('/', (req, res) =>{
    res.status(200).send('<h1>Hello World</h1>')
});
app.use('/api/v1/auth', authRouters);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postRouters);

/** ERROR HANDLER MIDDLEWARE */
app.all('/{*any}', notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});