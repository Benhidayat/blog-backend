const express = require('express');
const app = express();
const PORT = process.env.PORT || 8800;
const { logger } = require('./middleware/logsHandler');
const { notFoundError, errorHandler } = require('./middleware/errorHandler');


/** CUSTOM LOGGER */
app.use(logger);

/** ROUTES */
app.get('/', (req, res) =>{
    res.status(200).send('<h1>Hello World</h1>')
});

/** ERROR HANDLER MIDDLEWARE */
app.all('/{*any}', notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});