import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function ProgressCard({ progress, onDelete, onTagClick }) {

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

            <button onClick={handleDelete}>🗑 Delete</button>
        </motion.div>
    );
}
