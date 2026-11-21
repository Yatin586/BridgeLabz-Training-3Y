// Grab the elements we need once, so we do not search the DOM repeatedly
const productInput = document.getElementById("productInput");
const addBtn = document.getElementById("addBtn");
const productList = document.getElementById("productList");

// Remembers which <li> is currently in edit mode (null when none)
let editingItem = null;

// Build one list item containing the name and its Edit/Delete buttons
function createProductItem(productName) {
  const listItem = document.createElement("li");
  listItem.className = "product-item";

  const nameSpan = document.createElement("span");
  nameSpan.className = "product-name";
  nameSpan.textContent = productName;

  // data-action tells the delegated handler which button was clicked
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.dataset.action = "edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset.action = "delete";

  listItem.append(nameSpan, editBtn, deleteBtn);
  return listItem;
}

// Add a new product from the input box
function addProduct() {
  const productName = productInput.value.trim();
  if (productName === "") return; // ignore empty input

  productList.appendChild(createProductItem(productName));
  productInput.value = "";
  productInput.focus();
}

// Switch an item into edit mode: replace the text with an input box
function startEditing(listItem) {
  // Only one item can be edited at a time, so save the previous one first
  if (editingItem && editingItem !== listItem) {
    saveEditing(editingItem);
  }

  const nameSpan = listItem.querySelector(".product-name");
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = nameSpan.textContent;

  listItem.replaceChild(editInput, nameSpan);
  listItem.querySelector("[data-action='edit']").textContent = "Save";
  editInput.focus();

  editingItem = listItem;
}

// Switch an item back to normal mode, keeping the edited text
function saveEditing(listItem) {
  const editInput = listItem.querySelector(".edit-input");
  const newName = editInput.value.trim();

  const nameSpan = document.createElement("span");
  nameSpan.className = "product-name";
  // If the user cleared the box, keep the old text so the item never becomes empty
  nameSpan.textContent = newName !== "" ? newName : editInput.defaultValue;

  listItem.replaceChild(nameSpan, editInput);
  listItem.querySelector("[data-action='edit']").textContent = "Edit";

  editingItem = null;
}

// EVENT DELEGATION: one listener on the parent <ul> handles every button
productList.addEventListener("click", function (event) {
  const action = event.target.dataset.action;
  if (!action) return; // click was not on an Edit/Delete button

  const listItem = event.target.closest("li");

  if (action === "edit") {
    // The same button acts as "Save" while the item is being edited
    if (listItem === editingItem) {
      saveEditing(listItem);
    } else {
      startEditing(listItem);
    }
  } else if (action === "delete") {
    if (listItem === editingItem) editingItem = null;
    listItem.remove();
  }
});

// Pressing Enter inside the edit box saves it as well
productList.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && event.target.classList.contains("edit-input")) {
    saveEditing(event.target.closest("li"));
  }
});

// Auto-save: a click anywhere outside the edited item saves it
document.addEventListener("click", function (event) {
  if (editingItem && !editingItem.contains(event.target)) {
    saveEditing(editingItem);
  }
});

addBtn.addEventListener("click", addProduct);
productInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addProduct();
});
