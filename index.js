const express = require('express');
const { connectMongoDb } = require('./connection');
const PORT = 8000;
const app = express();
const userRouter = require('./routes/user_routes');
const { logReqRes } = require('./middlewares/index_middlewares');

//Connection to MongoDb
connectMongoDb('mongodb://localhost:27017/rest-api-learn')
.then(() => console.log('MongoDB Connected'));

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'));

//Routes
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log('Server has started'));