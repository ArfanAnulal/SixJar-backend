const app = require('./app');
const connectDB = require('./config/mongodb'); 
const PORT = process.env.PORT || 3000;

connectDB()
.then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
})
.catch((err) => {
  console.error('Database connection error:', err);
});