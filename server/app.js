const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { RedisStore } = require('connect-redis');
const app = express();
const port = 3000;
const morgan = require('morgan');
const route = require('./routes/index');
const { createClient } = require('redis');
const passport = require('passport');
const dotenv = require('dotenv');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
dotenv.config();
require('dotenv').config();
require('./config/passport/passport');

const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect().catch(console.error);

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: 'lax', // Hoặc 'strict'
            maxAge: 24 * 60 * 60 * 1000, // 1 ngày
        },
    }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(morgan('combined'));
// Connect to db
db.connect();

// app.use(methodOverride('_method'));
app.use((req, res, next) => {
    console.log('📝 Current Session:', req.session);
    console.log('🧑 Current User:', req.user);
    next();
});

route(app);

// Lắng nghe
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
