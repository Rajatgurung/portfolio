import initWebGl from "./WEBgl";
import gsap, { TimelineMax, CSSPlugin } from "gsap";
import { Loader } from "three";
import initCrusor from "./crusor";
import initProject from "./project";
function main() {
  initProject();
  gsap.set("header", { opacity: 0 });

  gsap
    .to("#loder", { autoAlpha: 0, duration: 1.5 })
    .eventCallback("onComplete", (e) => {
      gsap.set("#loder", { display: "none" });

      gsap.to("#cursor", { autoAlpha: "1", duration: 1.5 });
      gsap.to("header", { opacity: 1, duration: 2 });

      initWebGl();
      initCrusor();
    });
}

window.onload = (ev) => {
  main();
};
