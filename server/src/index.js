require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
//     })
//     .catch(err => console.error("❌ Database connection failed:", err));
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error(" MONGO_URI is not defined. Check your .env file!");
    process.exit(1);
}
app.listen(PORT,()=>{
    console.log("server started");
})
mongoose.connect(mongoURI)
    .then(() => console.log(" Connected to MongoDB!"))
    .catch(err => console.error(" Database connection failed:", err));

app.get("/",(req,res)=>{
    res.send("hello worldji!!")
})
const adminRoutes = require("./routes/admindash");
app.use("/admin", adminRoutes);