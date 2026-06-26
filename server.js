// ─── server.js (Full Working Version) ─────────────────────────

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// ─── MIDDLEWARE ───────────────────────────────────────────────

// Serve static files from public folder
app.use(express.static('public'));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// ─── MONGODB CONNECTION ───────────────────────────────────────

// ✅ IMPORTANT: Replace username/password if needed
const MONGO_URI =
"mongodb://bhavanapadole42_db_user:tanu12345@ac-otvz6ju-shard-00-00.asmssjd.mongodb.net:27017,ac-otvz6ju-shard-00-01.asmssjd.mongodb.net:27017,ac-otvz6ju-shard-00-02.asmssjd.mongodb.net:27017/?ssl=true&replicaSet=atlas-tnvtsf-shard-0&authSource=admin&appName=Cluster0";
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.log('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });

// ─── SCHEMA & MODEL ──────────────────────────────────────────

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// ─── ROUTES ──────────────────────────────────────────────────

// POST route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    const studentName = req.body.name;
    const studentSurname = req.body.surname;

    console.log('New student received:');
    console.log('Name:', studentName);
    console.log('Surname:', studentSurname);

    const newStudent = new Student({
      name: studentName,
      surname: studentSurname
    });

    await newStudent.save();

    console.log('✅ Student saved to MongoDB!');

    res.send(`
      <html>
        <body style="font-family: Arial;">
          <h1>✅ Registration Successful!</h1>
          <p><b>Name:</b> ${studentName}</p>
          <p><b>Surname:</b> ${studentSurname}</p>
          <p>Your details have been saved to the database.</p>
          <a href="/form.html">⬅ Go Back to Form</a>
        </body>
      </html>
    `);

  } catch (error) {
    console.log('❌ Error:', error.message);
    res.send('Something went wrong: ' + error.message);
  }
});

// ─── START SERVER ────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT}/form.html in your browser`);
});