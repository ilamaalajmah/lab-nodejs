import Blog from '../models/blogSchema.js';

export const createBlog = async (req, res) => {
    try {
        const { name, description, articles } = req.body;
        const blog = new Blog({
            name,
            description,
            owner: req.user.id,
            articles
        });

        await blog.save();
        res.status(201).json({ message: 'Blog created', blog });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog', error });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('owner articles');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blogs', error });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('owner articles');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blog', error });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { name, description, articles } = req.body;
        const blog = await Blog.findByIdAndUpdate(req.params.id, { name, description, articles }, { new: true });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog updated', blog });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog', error });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error });
    }
};