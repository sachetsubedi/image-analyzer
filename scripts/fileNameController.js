const fileInput = document.getElementById("file-upload");
const fileNameDisplay = document.getElementById("file-name");
const filePreview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const fileName = file.name;
    fileNameDisplay.classList.remove("hidden");
    analyzeBtn.classList.remove("hidden");

    fileNameDisplay.textContent = `Selected File: ${fileName}`;

    const reader = new FileReader();
    reader.onload = function (event) {
      filePreview.src = event.target.result;
      filePreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  } else {
    fileNameDisplay.textContent = "No file selected";
    filePreview.classList.add("hidden");
  }
});
