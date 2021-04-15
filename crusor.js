export default function () {
  const crusor = document.getElementById("cursor");
  const corusoXY = { x: 0, y: 0 };
  const { width: cWidth, height: cHeight } = crusor.getBoundingClientRect();

  document.addEventListener("mousemove", (e) => {
    corusoXY.x = e.clientX;
    corusoXY.y = e.clientY;
  });

  const addPulse = () => {
    crusor.classList.add("pulse");
  };
  const removePulse = () => {
    crusor.classList.remove("pulse");
  };
  const ancor = document.querySelectorAll("a");
  const button = document.querySelectorAll("button");

  [...ancor, ...button].map((el) => {
    el.addEventListener("mouseenter", addPulse);
    el.addEventListener("mouseleave", removePulse);
  });

  const render = () => {
    const { x, y } = corusoXY;
    crusor.style.transform = ` translate(${x - cWidth / 2}px, ${
      y - cWidth / 2
    }px) `;

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}
