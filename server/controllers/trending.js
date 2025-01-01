import { db } from "../db.js";

export const getTrendingPosts = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT p.id, p.title, p.status, p.region, p.updated
       FROM trending t
       JOIN posts p ON t.pid = p.id
       ORDER BY t.created_at DESC`
    );
    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching trending posts:", error);
    return res.status(500).json({ message: "Error fetching trending posts" });
  }
};

export const addTrendingPost = async (req, res) => {
  const { pid } = req.body;

  try {
    const postResult = await db.query("SELECT id FROM posts WHERE id = $1", [pid]);
    if (postResult.rowCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingTrending = await db.query("SELECT * FROM trending WHERE pid = $1", [pid]);
    if (existingTrending.rowCount > 0) {
      return res.status(400).json({ message: "Post is already trending" });
    }

    const result = await db.query(
      "INSERT INTO trending (pid) VALUES ($1) RETURNING id, pid, created_at",
      [pid]
    );

    return res.json({ message: "Post added to trending", trendingPost: result.rows[0] });
  } catch (error) {
    console.error("Error adding post to trending:", error);
    return res.status(500).json({ message: "Error adding post to trending" });
  }
};

export const deleteTrendingPost = async (req, res) => {
  const { id } = req.params;
    
  try {
    const result = await db.query("DELETE FROM trending WHERE pid = $1 RETURNING id", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Trending post not found" });
    }

    return res.json({ message: "Trending post deleted successfully" });
  } catch (error) {
    console.error("Error deleting trending post:", error);
    return res.status(500).json({ message: "Error deleting trending post" });
  }
};
