export default function Timeline({ progressList }) {
    return (
        <div>
            <h2>🕒 Timeline View</h2>
            <div style={{ borderLeft: "2px solid gray", paddingLeft: "10px" }}>
                {progressList.map(p => (
                    <div key={p.id} style={{ marginBottom: "20px", position: "relative" }}>
                        <div style={{
                            width: "15px", height: "15px",
                            background: "#007BFF",
                            borderRadius: "50%",
                            position: "absolute",
                            left: "-8px",
                            top: "5px"
                        }}>🎓</div>
                        <h4>{p.title}</h4>
                        <p>{p.description}</p>
                        <small>{p.privacy}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

