const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(
    () => {
        console.log('Connected to DB');
    }
).catch(
    (err) => {
        console.log(err);
    }
);

app.use(express.json());
app.use('/api/v1', authRoute);
app.use('/api/v1/users', userRoute);

app.listen(3000, () => {
    console.log('listening on port 5000');
});