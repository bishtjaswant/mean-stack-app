import express from 'express';
import bodyparser from 'body-parser'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import config from './config/database';
import apiRouter from './routes/api';

const app = express();
// const apiRouter = express.Router();
const port = 8080;

/** cross origin */
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

// mongo db

mongoose.Promise = global.Promise;
mongoose.connect(config.dbName, {useNewUrlParser: true});


const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('connected to monngo');
});

/**api */
app.use('/api', apiRouter);


// default routes
app.get('/', (req, res) => res.send('hello world'));

app.listen(process.env.PORT || port, () => console.log('server running on '+ port));
