const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

app.post("/convert", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  // ⚠️ Placeholder conversion
  // Replace this with real PDF conversion logic (LibreOffice, pdf-lib, etc.)
  
  const outputPath = path.join(__dirname, "output.pdf");

  fs.copyFileSync(filePath, outputPath);

  res.download(outputPath, "converted.pdf", () => {
    fs.unlinkSync(filePath);
    fs.unlinkSync(outputPath);
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
