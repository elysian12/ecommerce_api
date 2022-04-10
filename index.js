const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')

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
app.use('/api/v1/products', productRoute);

app.listen(process.env.PORT || 3000, (error) => {
    if (error) {
        return console.error(err);
    }
    return console.log(`listening on port ${process.env.PORT || 3000}`);
});