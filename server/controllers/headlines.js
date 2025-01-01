import { db } from "../db.js";

export const getHeadlines = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT h.id, h.headline_text, h.pid, p.title AS post_title FROM headlines h JOIN posts p ON h.pid = p.id"
        );
        return res.json(result.rows);
    } catch (error) {
        console.error("Error getting headlines:", error);
        return res.status(500).json({ message: "Error getting headlines" });
    }
};

export const addHeadline = async (req, res) => {
    const { pid, headline_text } = req.body;

    try {
        const result = await db.query(
            "INSERT INTO headlines (pid, headline_text) VALUES ($1, $2) RETURNING id",
            [pid, headline_text]
        );

        return res.json({ message: "Headline added successfully", id: result.rows[0].id });
    } catch (error) {
        console.error("Error adding headline:", error);
        return res.status(500).json({ message: "Error adding headline" });
    }
};

export const deleteHeadline = async (req, res) => {
    const { headlineid } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM headlines WHERE id = $1 RETURNING id",
            [headlineid]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Headline not found" });
        }

        return res.json({ message: "Headline deleted successfully" });
    } catch (error) {
        console.error("Error deleting headline:", error);
        return res.status(500).json({ message: "Error deleting headline" });
    }
};
