require('dotenv').config()

const express = require('express');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const commentRouter = require('./routes/comment');
const {connectDB} = require('./connection');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationAndCookie } = require('./middleware/authentication');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Blog = require('./models/blog');

const app = express();
const PORT = process.env.PORT;

//connect db
connectDB(process.env.MONGO_URL);

//Built in middleware
app.use(express.json(({limit: '50mb'})));
app.use(express.urlencoded({ limit :'50mb',extended: false }));
app.use(bodyParser.json());

app.use(cors('*'));
app.use(cookieParser());
//app.use(checkForAuthenticationAndCookie("token"));
app.use(express.static(path.resolve('./public')));

app.get('/getBlogImage/:id',async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.sendFile(`${__dirname}/${blog.coverImageURL}`);
});

app.use('/user',userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);

app.listen(PORT,()=>console.log(`Server started ar PORT ${PORT}`));