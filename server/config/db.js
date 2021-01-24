const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(
    "mongodb://localhost:27017/authboiler",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );

  console.log(`MongoDB Connected`);
};

module.exports = connectDB;
