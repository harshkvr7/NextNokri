import { db } from "../db.js";

export const addPost = async (req, res) => {
    const { title, type, region, content, status, last_date } = req.body;

    try {
        const postResult = await db.query(
            "INSERT INTO posts(title, ptype, region, status, updated, last_date) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5) RETURNING id",
            [title, type, region, status, last_date]
        );

        const postId = postResult.rows[0].id;

        await db.query(
            "INSERT INTO content(pid, text_content) VALUES ($1, $2)",
            [postId, content]
        );

        return res.json({ message: "Post created successfully" });
    } catch (error) {
        console.error("Error adding post:", error);
        return res.status(500).json({ message: "Error adding post" });
    }
};

export const getPosts = async (req, res) => {
    try {
        const { region, type } = req.query;

        let query = "SELECT id, title, status, updated, last_date FROM posts";
        const queryParams = [];
        const conditions = [];

        if (region) {
            conditions.push(`region = $${queryParams.length + 1}`);
            queryParams.push(region);
        }
        if (type) {
            conditions.push(`ptype = $${queryParams.length + 1}`);
            queryParams.push(type);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += " ORDER BY updated DESC";

        const result = await db.query(query, queryParams);

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error getting posts:", error.message);
        return res.status(500).json({ message: "An error occurred while fetching posts" });
    }
};

export const deletePost = async (req, res) => {
    const { postid } = req.params;

    try {   
        const result = await db.query(
            "DELETE FROM posts WHERE id = $1 RETURNING id",
            [postid]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ message: "Error deleting post" });
    }
};

export const updatePost = async (req, res) => {
    const { postid } = req.params;
    const { title, type, region, content, status, last_date } = req.body;

    try {
        const postResult = await db.query(
            "UPDATE posts SET title = $1, ptype = $2, region = $3, status = $4, updated = CURRENT_TIMESTAMP, last_date = $5 WHERE id = $6 RETURNING id",
            [title, type, region, status, last_date, postid]
        );

        if (postResult.rowCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        const contentResult = await db.query(
            "UPDATE content SET text_content = $1 WHERE pid = $2",
            [content, postid]
        );

        if (contentResult.rowCount === 0) {
            return res.status(404).json({ message: "Content for the post not found" });
        }

        return res.json({ message: "Post updated successfully" });
    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({ message: "Error updating post" });
    }
};

export const getPost = async (req, res) => {
    const { postid } = req.params;

    try {
        const postResult = await db.query(
            "SELECT id, title, ptype, region, status, updated, last_date FROM posts WHERE id = $1",
            [postid]
        );

        if (postResult.rowCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        const post = postResult.rows[0];

        const contentResult = await db.query(
            "SELECT text_content FROM content WHERE pid = $1",
            [postid]
        );

        if (contentResult.rowCount === 0) {
            return res.status(404).json({ message: "Content for the post not found" });
        }

        const content = contentResult.rows[0].text_content;

        return res.json({
            id: post.id,
            title: post.title,
            type: post.ptype,
            region: post.region,
            status: post.status,
            updated: post.updated,
            last_date: post.last_date,
            content: content,
        });
    } catch (error) {
        console.error("Error getting post:", error);
        return res.status(500).json({ message: "Error getting post" });
    }
};
