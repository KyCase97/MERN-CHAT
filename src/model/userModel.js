import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nama wajib Diisi"],
    unique: [true, "Username Sudah digunakan silahkan buat yang lain!"],
  },
  email: {
    type: String,
    required: [true, "Email wajib Diisi"],
    unique: [true, "Email sudah pernah didaftarkan!"],
    validate: {
      validator: validator.isEmail,
      message: "inputan harus berformat foo@gmail.com",
    },
  },
  password: {
    type: String,
    required: [true, "Password Wajib diisi"],
    minlength: [6, "password minimal 6 karakter"],
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
