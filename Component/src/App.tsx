import React from "react"; 
import phoneImg from "./assets/mobile 1.png";

const App: React.FC = () => {
  // The requested screenshot URL
  const screenContentUrl = "https://www.androidpolice.com/wp-content/uploads/2020/05/Screenshot_20200508-180220.png";

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* --- NEW: The Screen Content (Placed before or after phone depending on z-index) --- */}
        <img 
          src={screenContentUrl}
          alt="App Screen"
          style={styles.screenOverlay}
        />

        {/* Phone Frame Image */}
        <img
          src={phoneImg}
          alt="Mobile Preview"
          draggable={false}
          style={styles.phoneImage}
        />

        {/* Bottom Floating Action Bar */}
        <div style={styles.actionBar}>
          <div style={{ ...styles.action, ...styles.danger }}>
            <span role="img" aria-label="warning" style={styles.icon}>⚠️</span> Suspicious Behavior
          </div>

          <div style={{ ...styles.action, ...styles.muted }}>
            <span role="img" aria-label="lock" style={styles.icon}>🔒</span> Secreteye App
          </div>

          <div style={{ ...styles.action, ...styles.download }}>
            <span role="img" aria-label="download" style={styles.icon}>⬇️</span> Download
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

/* ===================== STYLES ===================== */

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // Ensure the container wraps tight around the images so centering works
    width: "fit-content", 
  },

  /* --- NEW STYLE FOR THE SCREENSHOT --- */
   screenOverlay: {
    position: "absolute",
    top: "38%",
    left: "35%",
    transform: "translate(-50%, -50%)", // Perfect center centering
    width: "45%", // Adjust this percentage to fit inside the bezels of your specific phoneImg
    height: "72%", // Adjust this slightly if the screenshot is too tall/short
    objectFit: "cover",
    zIndex: 3, // Places it on top of the phone. Change to 1 if your phoneImg is a transparent frame.
    borderRadius: "30px", // Rounds the corners to look like a real screen
    pointerEvents: "none",
  }, 

  phoneImage: {
    height: "80vh",
    maxHeight: "720px",
    objectFit: "contain",
    zIndex: 2, // If this is a transparent frame, set this to 3 and screenOverlay to 1
    userSelect: "none",
    pointerEvents: "none",
  },

  actionBar: {
    position: "absolute",
    bottom: "40px",
    left: "50%", // Changed to 50% for better centering logic
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
    padding: "10px 14px",
    background: "rgba(20, 20, 20, 0.85)",
    borderRadius: "30px",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    zIndex: 4, // Ensure this stays on top of everything
  },

  action: {
    padding: "10px 18px",
    borderRadius: "24px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    fontFamily: "sans-serif",
  },

  icon: {
    fontSize: "18px",
  },

  danger: {
    backgroundColor: "#00E0E6",
    color: "#000000",
  },

  muted: {
    backgroundColor: "rgba(43, 43, 43, 0.8)",
    color: "#cfcfcf",
  },

  download: {
    backgroundColor: "rgba(43, 43, 43, 0.8)",
    cursor: "pointer",
  },
};