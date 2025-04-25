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
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700">
                📘 Add a New Learning Progress
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">📂 Select Template</label>
                    <select
                        value={templateType}
                        onChange={(e) => setTemplateType(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Choose Template --</option>
                        <option value="Completed Tutorial">📘 Completed Tutorial</option>
                        <option value="Learned New Skill">🎯 Learned New Skill</option>
                        <option value="General Update">📝 General Update</option>
                    </select>
                </div>

                {templateType === "Completed Tutorial" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" name="tutorialName" placeholder="Tutorial Name" value={formData.tutorialName} onChange={handleChange} />
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" name="keyTakeaway" placeholder="Key Takeaway" value={formData.keyTakeaway} onChange={handleChange} />
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" name="timeSpent" placeholder="Time Spent" value={formData.timeSpent} onChange={handleChange} />
                    </div>
                )}

                {templateType === "Learned New Skill" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" name="skillName" placeholder="Skill Name" value={formData.skillName} onChange={handleChange} />
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" name="howILearned" placeholder="How I Learned" value={formData.howILearned} onChange={handleChange} />
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" name="myTip" placeholder="Your Tip" value={formData.myTip} onChange={handleChange} />
                    </div>
                )}

                {templateType === "General Update" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" name="generalWork" placeholder="What did you work on?" value={formData.generalWork} onChange={handleChange} />
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" name="progressMade" placeholder="Progress Made" value={formData.progressMade} onChange={handleChange} />
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" name="feeling" placeholder="How are you feeling?" value={formData.feeling} onChange={handleChange} />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} />
                    <select name="privacy" value={formData.privacy} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500">
                        <option value="PUBLIC">🌍 Public</option>
                        <option value="PRIVATE">🔒 Private</option>
                        <option value="MENTOR_ONLY">👨‍🏫 Mentor Only</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">🖼 Upload Screenshot (Optional)</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="block" />
                    {screenshot && (
                        <div className="mt-2">
                            <img src={screenshot} alt="preview" className="rounded-md shadow-md w-60 border" />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid()}
                    className={`w-full py-2 rounded text-white font-bold transition ${
                        isFormValid() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    ➕ Submit Progress
                </button>
            </form>
        </div>
    );
}

