const express = require('express');
const app = express();
const PORT = process.env.PORT || 8800;
const { logger } = require('./middleware/logsHandler');
const { notFoundError, errorHandler } = require('./middleware/errorHandler');
const usersRouter = require('./routes/users');
const authRouters = require('./routes/auth');

/** CUSTOM LOGGER */
app.use(logger);

// BODY REQUEST PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** ROUTES */
app.get('/', (req, res) =>{
    res.status(200).send('<h1>Hello World</h1>')
});
app.use('/users', usersRouter);
app.use('/auth', authRouters);

/** ERROR HANDLER MIDDLEWARE */
app.all('/{*any}', notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});