import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { String } = Schema.Types;

const userSchema = new Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        phone: { type: Number, required: true },
        dob: { type: Date, required: true },
        password: { type: String, select: false, required: true },
    },
    { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id, },
        process.env.JWT_SECRET ?? ""
    );
};

const User = models.User || model("User", userSchema);

export default User;