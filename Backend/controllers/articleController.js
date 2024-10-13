import Article from '../models/articleSchema.js';

export const createArticle = async (req, res) => {
    try {
        const { title, body } = req.body;
        const article = new Article({
            title,
            body,
            author: req.user.id,
        });

        await article.save();
        res.status(201).json({ message: 'Article created', article });
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
};

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('author');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving articles', error });
    }
};

export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author');
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving article', error });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { title, body } = req.body;
        const article = await Article.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article updated', article });
    } catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
};