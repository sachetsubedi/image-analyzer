const filesInput = document.getElementById("file-upload");
const loader = document.getElementById("loader");
analyzeBtn.addEventListener("click", async () => {
  const files = filesInput.files;
  if (files.length === 0) {
    return alert("Please select a file");
  }
  const file = files[0];
  const formData = new FormData();
  formData.append("image", file);

  analyzeBtn.disabled = true;
  loader.classList.remove("hidden");

  const response = await fetch(
    "http://image-analyzer--lyt6q4a.whitetree-ac90122e.australiaeast.azurecontainerapps.io/",
    {
      method: "POST",
      body: formData,
    }
  );

  analyzeBtn.disabled = false;

  const data = await response.json();
  console.log(data);
  loader.classList.add("hidden");
});
