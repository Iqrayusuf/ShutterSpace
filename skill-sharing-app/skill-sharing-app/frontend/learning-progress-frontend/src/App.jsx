import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import ProgressForm from "./components/ProgressForm";
import ProgressCard from "./components/ProgressCard";
import Timeline from "./components/Timeline";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [progressList, setProgressList] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");

    const loadProgress = () => {
        axios.get("http://localhost:8080/api/progress/user")
            .then(res => setProgressList(res.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        loadProgress();
    }, []);

    const filteredList = selectedTag
        ? progressList.filter(p => (p.tags || "").split(" ").map(t => t.replace("#", "")).includes(selectedTag))
        : progressList;

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h1>🌟 Learning Progress Tracker</h1>

            {/* Progress Form */}
            <ProgressForm onAdded={loadProgress} />

            {/* Filter Tag Display */}
            {selectedTag && <p>Filter Active: #{selectedTag} <button onClick={() => setSelectedTag("")}>Clear Filter ❌</button></p>}

            {/* Progress Cards */}
            {filteredList.map(p => (
                <ProgressCard key={p.id} progress={p} onDelete={loadProgress} onTagClick={(tag) => setSelectedTag(tag)} />
            ))}

            {/* Timeline */}
            <Timeline progressList={filteredList} />

            {/* ToastContainer for global toast messages */}
            <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
        </div>
    );
}

export default App;
