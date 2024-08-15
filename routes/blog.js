const Router = require('express');
const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       // cb(null, path.resolve(`./public/uploads/`))
       cb(null,'uploads/');
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()} -${file.originalname}`;
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })

router.post('/addBlog', upload.single('coverImageURL'), async (req, res, next) => {
    const { title, body, createdBy } = req.body;
    console.log(req.body);
console.log(req.file);
    await Blog.create({
        title, body,
        createdBy,
        coverImageURL: `uploads/${req.file.filename}`
    });
    console.log(req.file.filename);
    return res.status(200).json({ message: 'Blog Created Successfully' });
})
router.get('/getBlog/:id',async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    const blogImage = res.sendFile(`${__dirname}/${blog.coverImageURL}`);
    console.log(blogImage);
    return res.status(200).json({ blog: blog });
});

router.post('/getAllBlog',async (req, res, next) => {
    const {createdBy} = req.body
    const blog = await Blog.find({createdBy});

    return res.status(200).json({ blog: blog });
})

router.post('/deleteBlog', async(req,res,next)=>{
    const {id} = req.body
        const blog = await Blog.findByIdAndDelete(id);
        console.log(blog);
        return res.json({ status: 'Blog deleted successfully' });
    
})

router.post('/updateBlog', async(req,res,next)=>{
    const {id,title,body} = req.body
    await Blog.findByIdAndUpdate(id, { title,body});
        return res.json({ status: 'Blog updated successfully' });
    
})

module.exports = router;