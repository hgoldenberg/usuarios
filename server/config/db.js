const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("mongodb://localhost:27017/usuarios");
  const connection = await mongoose.connect(
    "mongodb://localhost:27017/usuarios",
    //"mongodb://localhost:27017/authboiler",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );

  console.log(`MongoDB Connected: ${connection.connection.host}`);
};

module.exports = connectDB;
