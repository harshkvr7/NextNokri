import { db } from "../db.js";

export const addPost = async (req, res) => {
    const { title, type, region, content, status, last_date, tags } = req.body;

    try {
        // Insert the post
        const postResult = await db.query(
            "INSERT INTO posts(title, ptype, region, status, updated, last_date) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5) RETURNING id",
            [title, type, region, status, last_date]
        );

        const postId = postResult.rows[0].id;

        // Insert the content
        await db.query(
            "INSERT INTO content(pid, text_content) VALUES ($1, $2)",
            [postId, content]
        );

        // Insert tags and create relationships
        if (tags && tags.length > 0) {
            // Insert tags if they don't exist already
            for (let tag of tags) {
                const tagResult = await db.query(
                    "INSERT INTO tags(name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id",
                    [tag]
                );

                const tagId = tagResult.rows[0]?.id;

                // Link the tag to the post
                if (tagId) {
                    await db.query(
                        "INSERT INTO post_tags(post_id, tag_id) VALUES ($1, $2)",
                        [postId, tagId]
                    );
                }
            }
        }

        return res.json({ message: "Post created successfully" });
    } catch (error) {
        console.error("Error adding post:", error);
        return res.status(500).json({ message: "Error adding post" });
    }
};


export const getPosts = async (req, res) => {
    try {
        const { region, type, status, limit, tags } = req.query;
        
        const queryParams = [];
        let query = "SELECT posts.id, posts.title, posts.region, posts.status, posts.updated, posts.last_date FROM posts";

        const conditions = [];

        // Filtering by region
        if (region) {
            conditions.push(`region = $${queryParams.length + 1}`);
            queryParams.push(region);
        }

        // Filtering by type
        if (type) {
            conditions.push(`ptype = $${queryParams.length + 1}`);
            queryParams.push(type);
        }

        // Filtering by status
        if (status) {
            conditions.push(`status = $${queryParams.length + 1}`);
            queryParams.push(status);
        }

        // Filtering by tags
        if (tags) {
            const tagConditions = tags.split(',').map((tag, index) => {
                queryParams.push(tag);
                return `tags.name = $${queryParams.length}`;
            });
            conditions.push(`EXISTS (SELECT 1 FROM post_tags pt JOIN tags ON pt.tag_id = tags.id WHERE pt.post_id = posts.id AND (${tagConditions.join(' OR ')}))`);
        }

        // Apply conditions if any
        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        // Order the posts by updated date
        query += " ORDER BY updated DESC";

        // Apply LIMIT if it's provided in the query params
        if (limit) {
            query += ` LIMIT $${queryParams.length + 1}`;
            queryParams.push(parseInt(limit, 10)); // Make sure the limit is an integer
        }

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
