const cursorCircle = document.getElementById("cursorCircle");

document.addEventListener("mousemove", (event) => {
    cursorCircle.style.left = `${event.clientX}px`;
    cursorCircle.style.top = `${event.clientY}px`;
});