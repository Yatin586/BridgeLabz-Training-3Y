const gallery = document.getElementById("gallery");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const modalImage = document.getElementById("modalImage");

// Six sample pictures: a colour and a label each
const pictures = [
  { color: "#e74c3c", label: "Red" },
  { color: "#3498db", label: "Blue" },
  { color: "#2ecc71", label: "Green" },
  { color: "#f39c12", label: "Orange" },
  { color: "#9b59b6", label: "Purple" },
  { color: "#1abc9c", label: "Teal" }
];

// Build an SVG image as a data URL so the gallery works offline
function makeImageUrl(color, label, size) {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "'>" +
    "<rect width='100%' height='100%' fill='" + color + "'/>" +
    "<text x='50%' y='50%' font-size='" + size / 8 + "' fill='white' " +
    "text-anchor='middle' dominant-baseline='middle'>" + label + "</text></svg>";
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// Create the six thumbnails; the large version URL is kept in a data attribute
pictures.forEach(function (picture) {
  const thumbnail = document.createElement("img");
  thumbnail.src = makeImageUrl(picture.color, picture.label, 200);
  thumbnail.alt = picture.label + " picture";
  thumbnail.dataset.large = makeImageUrl(picture.color, picture.label, 700);
  gallery.appendChild(thumbnail);
});

// Event delegation: one listener on the grid handles all thumbnails
gallery.addEventListener("click", function (event) {
  if (event.target.tagName !== "IMG") return;

  modalImage.src = event.target.dataset.large;
  modalOverlay.classList.remove("hidden");
});

// Clicking the dark area outside the modal closes it
modalOverlay.addEventListener("click", function () {
  modalOverlay.classList.add("hidden");
});

// Clicks inside the modal must NOT reach the overlay, so stop them here
modalContent.addEventListener("click", function (event) {
  event.stopPropagation();
});
