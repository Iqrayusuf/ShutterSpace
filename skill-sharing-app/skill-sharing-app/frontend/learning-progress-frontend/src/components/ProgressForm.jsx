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

        // Dismiss all existing toasts before showing a new one
        toast.dismiss();

        axios.post("http://localhost:8080/api/progress", finalData)
            .then(() => {
                toast.success("✅ Progress Added Successfully!", { autoClose: 2000, toastId: "success-toast" }); // Use a unique toastId
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
            .catch(err => {
                toast.error("❌ Failed to add progress. Please try again.", { autoClose: 2000, toastId: "error-toast" }); // Use a unique toastId
                console.log(err);
            });
    };

    return (
        <>
            <form id="progress-form" onSubmit={handleSubmit} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "15px", backgroundColor: "#f9f9f9", width: "120%", marginLeft: "auto", marginRight: "auto" }}>
                <h2 style={{ textAlign: "center", marginBottom: "15px", fontSize: "1.5rem" }}>📝 Share Your Learning Progress</h2>

                <div id="template-selection" style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: "5px" }}>Template Selection</h3>
                    <div className="radio-group">
                        <label className="radio-option">
                            <input
                                type="radio"
                                value="Completed Tutorial"
                                checked={templateType === "Completed Tutorial"}
                                onChange={(e) => setTemplateType(e.target.value)}
                            />
                            Completed a Tutorial
                        </label>
                        <label className="radio-option">
                            <input
                                type="radio"
                                value="Learned New Skill"
                                checked={templateType === "Learned New Skill"}
                                onChange={(e) => setTemplateType(e.target.value)}
                            />
                            Learned a New Skill
                        </label>
                        <label className="radio-option">
                            <input
                                type="radio"
                                value="General Update"
                                checked={templateType === "General Update"}
                                onChange={(e) => setTemplateType(e.target.value)}
                            />
                            General Update
                        </label>
                    </div>
                </div>




                {templateType === "Completed Tutorial" && (
                    <>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ fontWeight: "bold" }}>Tutorial Name</label>
                            <input type="text" name="tutorialName" placeholder="Enter tutorial name" value={formData.tutorialName} onChange={handleChange} required style={{ width: "100%", padding: "6px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ fontWeight: "bold" }}>Key Takeaway</label>
                            <input type="text" name="keyTakeaway" placeholder="What did you learn?" value={formData.keyTakeaway} onChange={handleChange} required style={{ width: "100%", padding: "6px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ fontWeight: "bold" }}>Time Spent</label>
                            <input type="text" name="timeSpent" placeholder="e.g., 2 hours" value={formData.timeSpent} onChange={handleChange} required style={{ width: "100%", padding: "6px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                        </div>
                    </>
                )}

                {templateType === "Learned New Skill" && (
                    <>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ fontWeight: "bold" }}>Skill Name</label>
                            <input type="text" name="skillName" placeholder="Enter skill name" value={formData.skillName} onChange={handleChange} required style={{ width: "100%", padding: "6px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ fontWeight: "bold" }}>How I Learned</label>
                            <input type="text" name="howILearned" placeholder="Describe how you learned" value={formData.howILearned} onChange={handleChange} required style={{ width: "100%", padding: "6px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ fontWeight: "bold" }}>My Tip for Others</label>
                            <input type="text" name="myTip" placeholder="Share a tip" value={formData.myTip} onChange={handleChange} required style={{ width: "100%", padding: "6px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                        </div>
                    </>
                )}

                {templateType === "General Update" && (
                    <>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ fontWeight: "bold" }}>Today I worked on</label>
                            <input type="text" name="generalWork" placeholder="Describe your work" value={formData.generalWork} onChange={handleChange} required style={{ width: "100%", padding: "6px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ fontWeight: "bold" }}>Progress Made</label>
                            <input type="text" name="progressMade" placeholder="What progress did you make?" value={formData.progressMade} onChange={handleChange} required style={{ width: "100%", padding: "6px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Feeling</p>
                            <label style={{ marginRight: "10px" }}>
                                <input type="radio" name="feeling" value="😄 Confident" checked={formData.feeling === "😄 Confident"} onChange={handleChange} /> 😄 Confident
                            </label>
                            <label style={{ marginRight: "10px" }}>
                                <input type="radio" name="feeling" value="😐 Neutral" checked={formData.feeling === "😐 Neutral"} onChange={handleChange} /> 😐 Neutral
                            </label>
                            <label>
                                <input type="radio" name="feeling" value="😕 Confused" checked={formData.feeling === "😕 Confused"} onChange={handleChange} /> 😕 Confused
                            </label>
                        </div>
                    </>
                )}

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ fontWeight: "bold" }}>Tags</label>
                    <input type="text" name="tags" placeholder="#tags (comma-separated)" value={formData.tags} onChange={handleChange} style={{ width: "100%", padding: "6px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Privacy</p>
                    <label style={{ marginRight: "10px" }}>
                        <input type="radio" name="privacy" value="Public" checked={formData.privacy === "Public"} onChange={handleChange} /> Public
                    </label>
                    <label style={{ marginRight: "10px" }}>
                        <input type="radio" name="privacy" value="Private" checked={formData.privacy === "Private"} onChange={handleChange} /> Private
                    </label>
                    <label>
                        <input type="radio" name="privacy" value="Mentor Only" checked={formData.privacy === "Mentor Only"} onChange={handleChange} /> Share with Mentor Only
                    </label>
                </div>

                <button type="submit" disabled={!isFormValid()} style={{ marginTop: "10px", padding: "8px 15px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Post Update</button>
            </form>
            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
}

