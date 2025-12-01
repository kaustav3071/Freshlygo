import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    mobile?: string;
    role: "user" | "deliveryPartner" | "admin";
    image?: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: false,
        length: { min: 6, max: 20 },
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
    },
    mobile: {
        type: String,
        required: false,
        length: 10,
        pattern: /^[0-9]\d{9}$/
    },
    role: {
        type: String,
        enum: ["user", "deliveryPartner", "admin"],
        default: "user"
    },
    image: {
        type: String,
        required: false,
    }
},
    {
        timestamps: true
    });

userSchema.index({ mobile: 1 }, { unique: true, sparse: true });


const UserModel = mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>("User", userSchema);

export default UserModel;
