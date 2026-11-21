const trackBox = document.getElementById("trackBox");
const xValue = document.getElementById("xValue");
const yValue = document.getElementById("yValue");

// Live coordinates while the mouse moves inside the box
trackBox.addEventListener("mousemove", function (event) {
  xValue.textContent = event.clientX;
  yValue.textContent = event.clientY;
});

// Reset the display when the mouse leaves the box
trackBox.addEventListener("mouseleave", function () {
  xValue.textContent = "-";
  yValue.textContent = "-";
});

// Double-click drops a red dot at the clicked position
trackBox.addEventListener("dblclick", function (event) {
  // clientX/clientY are relative to the window, but the dot must be placed
  // relative to the box, so subtract the box's own position
  const boxPosition = trackBox.getBoundingClientRect();
  const dotLeft = event.clientX - boxPosition.left - trackBox.clientLeft;
  const dotTop = event.clientY - boxPosition.top - trackBox.clientTop;

  const dot = document.createElement("div");
  dot.className = "red-dot";
  dot.style.left = dotLeft + "px";
  dot.style.top = dotTop + "px";

  trackBox.appendChild(dot);
});
