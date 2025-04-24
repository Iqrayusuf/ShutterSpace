import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProgressForm({ onAdded }) {
    const [templateType, setTemplateType] = useState("");
    const [formData, setFormData] = useState({
        tutorialName: "",
        keyTakeaway: "",
        timeSpent: "",
        skillName: "",
        howILearned: "",
        myTip: "",
        generalWork: "",
        progressMade: "",
        feeling: "",
        tags: "",
        privacy: "Public"
    });

    const isFormValid = () => {
        if (!templateType) return false;
        if (templateType === "Completed Tutorial" && (!formData.tutorialName || !formData.keyTakeaway || !formData.timeSpent)) return false;
        if (templateType === "Learned New Skill" && (!formData.skillName || !formData.howILearned || !formData.myTip)) return false;
        if (templateType === "General Update" && (!formData.generalWork || !formData.progressMade || !formData.feeling)) return false;
        return true;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let finalData = {
            templateType: templateType,
            title: "",
            description: "",
            tags: formData.tags,
            privacy: formData.privacy
        };

        if (templateType === "Completed Tutorial") {
            finalData.title = formData.tutorialName;
            finalData.description = `Key Takeaway: ${formData.keyTakeaway} | Time Spent: ${formData.timeSpent}`;
        } else if (templateType === "Learned New Skill") {
            finalData.title = formData.skillName;
            finalData.description = `How I Learned: ${formData.howILearned} | Tip: ${formData.myTip}`;
        } else if (templateType === "General Update") {
            finalData.title = formData.generalWork;
            finalData.description = `Progress: ${formData.progressMade} | Feeling: ${formData.feeling}`;
        }

        axios.post("http://localhost:8080/api/progress", finalData)
            .then(() => {
                toast.success("✅ Progress Added Successfully!");
                onAdded();
                setTemplateType("");
                setFormData({
                    tutorialName: "",
                    keyTakeaway: "",
                    timeSpent: "",
                    skillName: "",
                    howILearned: "",
                    myTip: "",
                    generalWork: "",
                    progressMade: "",
                    feeling: "",
                    tags: "",
                    privacy: "Public"
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <form onSubmit={handleSubmit} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                <h2>📝 Share Your Learning Progress</h2>

                <p><strong>Template</strong></p>
                <label><input type="radio" value="Completed Tutorial" checked={templateType === "Completed Tutorial"} onChange={(e) => setTemplateType(e.target.value)} /> Completed a Tutorial</label><br />
                <label><input type="radio" value="Learned New Skill" checked={templateType === "Learned New Skill"} onChange={(e) => setTemplateType(e.target.value)} /> Learned a New Skill</label><br />
                <label><input type="radio" value="General Update" checked={templateType === "General Update"} onChange={(e) => setTemplateType(e.target.value)} /> General Update</label><br />

                {templateType === "Completed Tutorial" && (
                    <>
                        <input type="text" name="tutorialName" placeholder="Tutorial Name" value={formData.tutorialName} onChange={handleChange} required /><br />
                        <input type="text" name="keyTakeaway" placeholder="Key Takeaway" value={formData.keyTakeaway} onChange={handleChange} required /><br />
                        <input type="text" name="timeSpent" placeholder="Time Spent" value={formData.timeSpent} onChange={handleChange} required /><br />
                    </>
                )}

                {templateType === "Learned New Skill" && (
                    <>
                        <input type="text" name="skillName" placeholder="Skill Name" value={formData.skillName} onChange={handleChange} required /><br />
                        <input type="text" name="howILearned" placeholder="How I Learned" value={formData.howILearned} onChange={handleChange} required /><br />
                        <input type="text" name="myTip" placeholder="My Tip for Others" value={formData.myTip} onChange={handleChange} required /><br />
                    </>
                )}

                {templateType === "General Update" && (
                    <>
                        <input type="text" name="generalWork" placeholder="Today I worked on" value={formData.generalWork} onChange={handleChange} required /><br />
                        <input type="text" name="progressMade" placeholder="Progress Made" value={formData.progressMade} onChange={handleChange} required /><br />

                        <p><strong>Feeling</strong></p>
                        <label><input type="radio" name="feeling" value="😄 Confident" checked={formData.feeling === "😄 Confident"} onChange={handleChange} /> 😄 Confident</label><br />
                        <label><input type="radio" name="feeling" value="😐 Neutral" checked={formData.feeling === "😐 Neutral"} onChange={handleChange} /> 😐 Neutral</label><br />
                        <label><input type="radio" name="feeling" value="😕 Confused" checked={formData.feeling === "😕 Confused"} onChange={handleChange} /> 😕 Confused</label><br />
                    </>
                )}

                <input type="text" name="tags" placeholder="#tags" value={formData.tags} onChange={handleChange} /><br />

                <p><strong>Privacy</strong></p>
                <label><input type="radio" name="privacy" value="Public" checked={formData.privacy === "Public"} onChange={handleChange} /> Public</label><br />
                <label><input type="radio" name="privacy" value="Private" checked={formData.privacy === "Private"} onChange={handleChange} /> Private</label><br />
                <label><input type="radio" name="privacy" value="Mentor Only" checked={formData.privacy === "Mentor Only"} onChange={handleChange} /> Share with Mentor Only</label><br />

                <button type="submit" disabled={!isFormValid()} style={{ marginTop: "10px" }}>Post Update</button>
            </form>
            <ToastContainer position="top-center" />
        </>
    );
}
