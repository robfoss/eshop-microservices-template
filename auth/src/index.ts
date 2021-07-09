import express from 'express';
import 'express-async-errors';
import mongoose, { mongo } from 'mongoose';


import {currentUserRouter} from './routes/current-user'
import {signupRouter} from './routes/signup'
import {signinRouter} from './routes/signin'
import {signoutRouter} from './routes/signout'
import {errorHandler} from './middlewares/error-handler'
import {NotFoundError} from './errors/not-found-error'


const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);


app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler)


const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('Connected to mongo')     
    } catch (err) {
        console.error(err)
    } 

    app.listen(3000, () => {
        console.log('listening on 3000')
    });
};

start();
