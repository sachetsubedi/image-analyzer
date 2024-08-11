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

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  // Extract the file extension
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const fileExtension = file.name.split(".").pop().toLowerCase();

  // Check if the file extension is allowed
  if (!allowedExtensions.includes(fileExtension)) {
    alert("Please select a .jpg, .jpeg, or .png file.");
    return;
  }

  analyzeBtn.disabled = true;
  loader.classList.remove("hidden");

  const response = await fetch(
    "https://image-analyzer--lyt6q4a.whitetree-ac90122e.australiaeast.azurecontainerapps.io/",
    {
      method: "POST",
      body: formData,
    }
  );

  analyzeBtn.disabled = false;

  const data = await response.json();
  console.log(data);

  //   console.log(data.data.readResult.blocks[0].lines);
  if (response.ok) {
    showResult(data, file);
    loader.classList.add("hidden");
  } else {
    alert("An error occurred. Please try again later.");
    loader.classList.add("hidden");
  }
});

const showResult = (data, file) => {
  document.getElementById("results").classList.remove("hidden");
  const imageMIME = document.getElementById("imageMIME");
  imageMIME.innerHTML = `
    <div class="  flex gap-5">
        <div class='keys font-semibold'>
            <div>Name</div>
            <div>Size</div>
            <div>Type</div>
            <div>Modified on</div>
            <div>Height</div>
            <div>Width</div>
        </div>
        <div class='values font-normal'>
            <div>${file.name}</div>
            <div>${file.size} bytes</div>
            <div>${file.type}</div>
            <div>${file.lastModifiedDate}</div>
            <div>${data.data.metadata.height}</div>
            <div>${data.data.metadata.width}</div>
        </div>
    </div>
  `;

  document.getElementById("imageDetails").innerHTML = `
    <tr class="border-b-2 border-dashed border-b-white my-5">
        <td class="font-semibold pr-4 py-2">Analysis result</td>
        <td><span class="text-slate-800 px-2 py-1 bg-white rounded-sm">${
          data.data.captionResult.text
        }</span></td>
    </tr>
    
    <tr class="border-b-2 border-dashed border-b-white my-5 ">
        <td class="font-semibold pr-4 py-2">Dense analysis result</td>
        <td><span class="flex gap-2 flex-wrap">${data.data.denseCaptionsResult.values
          .map((v) => {
            return `<span class="text-slate-800 px-2 py-1 bg-white rounded-sm">${v.text}</span>`;
          })
          .join("")}</span></td>
    </tr>

     <tr class="border-b-2 border-dashed border-b-white ">
        <td class="font-semibold pr-4 py-2 ">Text analysis result</td>
        <td><span class="flex gap-2 flex-wrap ">${
          data.data.readResult.blocks[0]
            ? data.data.readResult.blocks[0].lines
                .map((v) => {
                  return `<span class="text-slate-800 px-2 py-1 bg-white rounded-sm">${v.text}</span>`;
                })
                .join("")
            : `<span class="text-slate-800 px-2 py-1 bg-slate-400 rounded-sm">Nothing found</span>`
        }</span></td>
    </tr>

    <tr class="border-b-2 border-dashed border-b-white  ">
        <td class="font-semibold pr-4 py-2">People found</td>
        <td> <span class="text-slate-800 px-2 py-1 bg-white rounded-sm ">${
          data.data.peopleResult.values.length
        } </span>
        </td>
    </tr>

     <tr class="border-b-2 border-dashed border-b-white ">
        <td class="font-semibold pr-4 py-2 ">Tags result</td>
        <td><span class="flex gap-2 flex-wrap ">${
          data.data.tagsResult.values
            ? data.data.tagsResult.values
                .map((v) => {
                  return `<span class="text-slate-800 px-2 py-1 bg-white rounded-sm">${v.name}</span>`;
                })
                .join("")
            : `<span class="text-slate-800 px-2 py-1 bg-slate-400 rounded-sm">Nothing found</span>`
        }</span></td>
    </tr>

    <tr class="border-b-2 border-dashed border-b-white  ">
        <td class="font-semibold pr-4 py-2">Objects found</td>
        <td> <span class="text-slate-800 px-2 py-1 bg-white rounded-sm ">${
          data.data.objectsResult.values.length
        } </span>
        </td>
    </tr>
  
  `;
};
