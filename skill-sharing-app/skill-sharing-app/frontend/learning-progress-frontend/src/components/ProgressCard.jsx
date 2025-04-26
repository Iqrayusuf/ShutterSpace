import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function ProgressCard({ progress, onDelete, onTagClick }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: progress.title,
        description: progress.description,
        tags: progress.tags,
        privacy: progress.privacy
    });

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = () => {
        axios.put(`http://localhost:8080/api/progress/${progress.id}`, editData)
            .then(() => {
                toast.success("Updated Successfully!");
                setIsEditing(false);
                onDelete(); // Reload the progress list
            })
            .catch(err => {
                toast.error("Failed to update progress.");
                console.log(err);
            });
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this progress?")) {
            axios.delete(`http://localhost:8080/api/progress/${progress.id}`)
                .then(() => {
                    toast.success("Deleted Successfully!");
                    onDelete();
                })
                .catch(err => console.log(err));
        }
    };

    const renderTags = () => {
        if (!progress.tags) return null;
        return progress.tags.split(" ").map(tag => (
            <span key={tag}
                  onClick={() => onTagClick(tag.replace("#", ""))}
                  style={{
                      background: "#007BFF",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "5px",
                      marginRight: "5px",
                      cursor: "pointer",
                      fontSize: "12px"
                  }}>
                {tag}
            </span>
        ));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                border: "1px solid #ccc",
                padding: "15px",
                margin: "15px 0",
                borderRadius: "10px",
                background: "#f9f9f9",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
        >
            {isEditing ? (
                <div>
                    <h3>Edit Progress</h3>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={editData.title}
                            onChange={handleEditChange}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={editData.description}
                            onChange={handleEditChange}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tags</label>
                        <input
                            type="text"
                            name="tags"
                            value={editData.tags}
                            onChange={handleEditChange}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Privacy</label>
                        <select
                            name="privacy"
                            value={editData.privacy}
                            onChange={handleEditChange}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <option value="Mentor Only">Mentor Only</option>
                        </select>
                    </div>
                    <button onClick={handleEditSubmit} style={{ marginRight: "10px", padding: "8px 15px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Save</button>
                    <button onClick={() => setIsEditing(false)} style={{ padding: "8px 15px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                </div>
            ) : (
                <>
                    <h3>{progress.title}</h3>
                    <p>{progress.description}</p>
                    <p><strong>Tags: </strong>{renderTags()}</p>
                    <p><strong>Privacy: </strong>{progress.privacy}</p>

                    {/* Screenshot Preview */}
                    {progress.screenshot && (
                        <div>
                            <p><strong>Screenshot:</strong></p>
                            <img src={`http://localhost:8080/uploads/${progress.screenshot}`} alt="Screenshot" style={{ maxWidth: "100%" }} />
                        </div>
                    )}
                    <button onClick={() => setIsEditing(true)} style={{ marginRight: "10px", padding: "8px 15px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>✏️ Edit</button>
                    <button onClick={handleDelete} style={{ padding: "8px 15px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>🗑 Delete</button>
                </>
            )}
        </motion.div>
    );
}
