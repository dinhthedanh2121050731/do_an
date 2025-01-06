const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 3000;
const morgan = require('morgan');
const route = require('./routes/index');
const db = require('./config/db');

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// Connect to db
db.connect();

app.use(morgan('combined'));
// app.use(methodOverride('_method'));

route(app);

// Lắng nghe
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
