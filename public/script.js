const form = document.getElementById("uploadForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    status.innerText = "Please select a file.";
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  status.innerText = "Uploading and converting...";

  try {
    const res = await fetch("/convert", {
      method: "POST",
      body: formData
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.pdf";
    a.click();

    status.innerText = "Download started!";
  } catch (err) {
    status.innerText = "Conversion failed.";
  }
});
