import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import phoneImg from "./assets/mobile 1.png"; // Your hand-holding-phone image
import loginImg from "./assets/login.png";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ref for the image inside the screen to animate it
  const screenRef = useRef<HTMLImageElement>(null);
  const loginScreenRef = useRef<HTMLImageElement>(null);

  const suspiciousBtnRef = useRef<HTMLDivElement>(null);
  const secretAppBtnRef = useRef<HTMLDivElement>(null);
  const downloadBtnRef = useRef<HTMLDivElement>(null);

  // Background layers for "filling from bottom" effect
  const greenLayerRef = useRef<HTMLDivElement>(null);
  const blueLayerRef = useRef<HTMLDivElement>(null);

  // REPLACE THIS with your specific map screenshot URL
  const currentMapUrl = "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // removed unused activeBg
      const activeText = "#000000";

      const inactiveText = "#6B7280";
      const transparent = "transparent";

      const whiteBg = "#FFFFFF";

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
        scale: 1.9,         // Zoom in deeper into the map
        y: "20%",           // Move map down (simulating tracking)
        x: "-10%",          // Move map left slightly
        transformOrigin: "center center",
        ease: "none",
        duration: 2
      }, 0);

      // --- BUTTON & THEME ANIMATIONS ---

      // Step 1: Suspicious -> Secreteye (Theme: Green)
      // Step 1: Suspicious -> Secreteye (Theme: Green fills from bottom)
      tl.addLabel("step1", 0.1)
        .to(greenLayerRef.current, {
          height: "100%",
          duration: 0.5,
          ease: "power1.inOut"
        }, "step1")
        .to(suspiciousBtnRef.current, {
          backgroundColor: transparent,
          color: inactiveText,
          duration: 0.5
        }, "step1")
        .to(secretAppBtnRef.current, {
          backgroundColor: whiteBg,
          color: activeText,
          duration: 0.5
        }, "step1");

      // Step 2: Secreteye -> Download (Theme: Blue fills from bottom)
      tl.addLabel("step2", 1.0)
        .to(blueLayerRef.current, {
          height: "100%",
          duration: 0.5,
          ease: "power1.inOut"
        }, "step2")
        .to(secretAppBtnRef.current, {
          backgroundColor: transparent,
          color: inactiveText,
          duration: 0.5
        }, "step2")
        .to(downloadBtnRef.current, {
          backgroundColor: whiteBg,
          color: activeText,
          duration: 0.5
        }, "step2")

        .to(loginScreenRef.current, {
          y: "0%",
          opacity: 1,
          duration: 0.5
        }, "step2");

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={styles.wrapper}>
      {/* Background Layers */}
      <div ref={greenLayerRef} style={{ ...styles.colorLayer, backgroundColor: "#00E676", zIndex: 0 }} />
      <div ref={blueLayerRef} style={{ ...styles.colorLayer, backgroundColor: "#2979FF", zIndex: 0 }} />

      <div ref={containerRef} style={styles.container}>

        {/* --- SCREEN MASK & IMAGE --- */}
        <div style={styles.screenMask}>
          <img
            ref={screenRef}
            src={currentMapUrl}
            alt="Map Screen"
            style={styles.screenImage}
          />
          <img
            ref={loginScreenRef}
            src={loginImg}
            alt="Login Screen"
            style={{ ...styles.screenImage, opacity: 0, transform: "translateY(100%)" }}
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
    width: "100vw", // Forces full viewport width
    margin: 0,      // Removes margins to touch edges
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center", // Horizontal center
    position: "relative",
    paddingTop: "10vh",
    overflowX: "hidden", // Prevents horizontal scrollbar if elements slightly overflow
  },
  colorLayer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "0%", // Start at 0 height
  },
  container: {
    position: "relative",
    zIndex: 1, // Ensure content sits on top of background layers
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "fit-content",
    height: "fit-content",
  },

  screenMask: {
    position: "absolute",
    // CENTERED POSITIONING
    left: "36%",
    top: "38%", // You might need to tweak this vertically depending on your image

    // DIMENSIONS
    width: "197px",
    height: "420px",

    // TRANSFORM: includes -50% X to perfectly center against the left: 50%
    transform: "translate(-50%, -50%) rotate(0deg)",

    borderRadius: "31px",
    overflow: "hidden",
    zIndex: 10,
    backgroundColor: "#000",
    // position: "relative", // removed due to redundancy with position: absolute above
  },

  screenImage: {
    position: "absolute",
    top: 0,
    left: 0,
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

    // CENTERED POSITIONING
    left: "50%",
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