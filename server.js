// Simple static file server for AquaConnect.
// Serves all the HTML/CSS/JS/JSON files in this folder and works out of the
// box on Render (or any host that sets the PORT environment variable).

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve every static asset (html, css, js, json) from the project root.
app.use(express.static(path.join(__dirname), { extensions: ["html"] }));

// Simple health check endpoint for Render / uptime monitors.
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// Fallback: send the login page for any unknown route so refreshing a
// client-side link still works.
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`AquaConnect server running on port ${PORT}`);
});
