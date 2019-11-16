const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
