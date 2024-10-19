const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./utils/logger.js');
const { ResponseFormatter } = require('./utils/response.js');
const routes = require('./routes/index.js');
const errorMiddleware = require('./middleware/error.middleware.js');
const sequelize = require('./db.js');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errorMiddleware);

app.use((req, res, next) => {
    ResponseFormatter.notFound(res);
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
