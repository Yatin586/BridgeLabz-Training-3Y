const searchInput = document.getElementById("searchInput");
const tableRows = document.querySelectorAll("#studentTable tr");
const noResults = document.getElementById("noResults");

// Runs on every keystroke because we listen to the "input" event
searchInput.addEventListener("input", function () {
  // Lower-case both sides so the search is case-insensitive
  const searchText = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  tableRows.forEach(function (row) {
    // textContent of the row contains Name, Branch and CGPA together
    const rowText = row.textContent.toLowerCase();
    const isMatch = rowText.includes(searchText);

    row.classList.toggle("hidden", !isMatch);
    if (isMatch) visibleCount++;
  });

  // Show the message only when nothing matched
  noResults.classList.toggle("hidden", visibleCount > 0);
});
