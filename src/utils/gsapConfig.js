import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Simple registration without version checks
gsap.registerPlugin(ScrollTrigger, SplitText);

// Suppress warnings
gsap.config({
  nullTargetWarn: false
});

export { gsap, ScrollTrigger, SplitText };