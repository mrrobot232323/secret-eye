import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import phoneImg from "./assets/mobile 1.png"; // Your hand-holding-phone image

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ref for the image inside the screen to animate it
  const screenRef = useRef<HTMLImageElement>(null);

  const suspiciousBtnRef = useRef<HTMLDivElement>(null);
  const secretAppBtnRef = useRef<HTMLDivElement>(null);
  const downloadBtnRef = useRef<HTMLDivElement>(null);

  // REPLACE THIS with your specific map screenshot URL
  const currentMapUrl = "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const activeBg = "#FFD400";
      const activeText = "#000000";
      const inactiveText = "#6B7280";
      const transparent = "transparent";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: containerRef.current,
        }
      });

      // --- SCREEN ANIMATION (Zoom & Pan Map) ---
      tl.to(screenRef.current, {
        scale: 1.5,         // Zoom in deeper into the map
        y: "20%",           // Move map down (simulating tracking)
        x: "-10%",          // Move map left slightly
        transformOrigin: "center center",
        ease: "none",       // Linear movement feels more like a map tracking
        duration: 2
      }, 0);

      // --- BUTTON ANIMATIONS ---
      // Step 1: Suspicious -> Secreteye
      tl.addLabel("step1")
        .to(suspiciousBtnRef.current, {
          backgroundColor: transparent,
          color: inactiveText,
          duration: 0.5
        }, "step1")
        .to(secretAppBtnRef.current, {
          backgroundColor: activeBg,
          color: activeText,
          duration: 0.5
        }, "step1");

      // Step 2: Secreteye -> Download
      tl.addLabel("step2")
        .to(secretAppBtnRef.current, {
          backgroundColor: transparent,
          color: inactiveText,
          duration: 0.5
        }, "step2+=0.2")
        .to(downloadBtnRef.current, {
          backgroundColor: activeBg,
          color: activeText,
          duration: 0.5
        }, "step2+=0.2");

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={styles.wrapper}>
      <div ref={containerRef} style={styles.container}>

        {/* --- SCREEN MASK & IMAGE --- */}
        <div style={styles.screenMask}>
          <img
            ref={screenRef}
            src={currentMapUrl}
            alt="Map Screen"
            style={styles.screenImage}
          />
        </div>

        {/* Phone Frame / Hand Image */}
        <img
          src={phoneImg}
          alt="Mobile Preview"
          draggable={false}
          style={styles.phoneImage}
        />

        {/* Floating Action Bar */}
        <div style={styles.actionBar}>
          <div ref={suspiciousBtnRef} style={styles.activeBtn}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8 }}>
              <path d="M12 2L1 21h22L12 2zm1 16h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
            Suspicious Behavior
          </div>

          <div ref={secretAppBtnRef} style={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            Secreteye App
          </div>

          <div ref={downloadBtnRef} style={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8 }}>
              <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z" />
            </svg>
            Download
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
    minHeight: "250vh",
    width: "100%", // Added width to ensure centering context
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center", // This centers the container horizontally
    position: "relative",
    paddingTop: "10vh",
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "fit-content",
    height: "fit-content",
    // REMOVED: transform: "translateX(14%)" to let flexbox center it naturally
  },

  screenMask: {
    position: "absolute",
    // 1. POSITIONING: Change these to move the screen image up/down/left/right
    top: "38%",
    left: "36%",

    // 2. DIMENSIONS: Match the width/height of the black screen area in your image
    width: "197px",
    height: "420px",

    // 3. TRANSFORM: If the hand is tilting the phone, add rotation here
    transform: "translate(-50%, -50%) rotate(0deg)",

    // 4. ROUNDING: Match the corner radius of the phone screen
    borderRadius: "31px",

    overflow: "hidden",
    zIndex: 10,
    backgroundColor: "#000",
  },

  screenImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  phoneImage: {
    height: "80vh",
    maxHeight: "720px",
    objectFit: "contain",
    zIndex: 2,
    userSelect: "none",
    pointerEvents: "none",
  },

  actionBar: {
    position: "absolute",
    bottom: "50px",
    left: "36%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "6px",
    background: "#000000",
    borderRadius: "100px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    zIndex: 10,
    whiteSpace: "nowrap",
  },
  activeBtn: {
    backgroundColor: "#FFD400",
    color: "#000000",
    padding: "12px 24px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "none",
  },
  navItem: {
    backgroundColor: "transparent",
    color: "#6B7280",
    padding: "12px 24px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};