const filesInput = document.getElementById("file-upload");
const loader = document.getElementById("loader");
analyzeBtn.addEventListener("click", async () => {
  const files = filesInput.files;
  if (files.length === 0) {
    return alert("Please select a file");
  }
  const file = files[0];
  console.log(file);
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
  showResult(data, file);
  loader.classList.add("hidden");
});

const showResult = (data, file) => {
  const imageMIME = document.getElementById("imageMIME");
  imageMIME.innerHTML = `
    <div class="  flex gap-5">
        <div class='keys font-semibold'>
            <div>Name</div>
            <div>Size</div>
            <div>Type</div>
            <div>Modified on</div>
        </div>
        <div class='values'>
            <div>${file.name}</div>
            <div>${file.size} bytes</div>
            <div>${file.type}</div>
            <div>${file.lastModifiedDate}</div>
        </div>
    </div>
  `;
};
