import mongoose from "mongoose";

interface IGrocery {
    id?: mongoose.Types.ObjectId;
    name: string;
    category: string;
    price: string;
    unit: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}
const GrocerySchema = new mongoose.Schema<IGrocery>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
            unique: true,
            sparse: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
            index: true,
            enum: [
                "Fruits & Vegetables",
                "Dairy & Eggs",
                "Rice, Atta & Grains",
                "Snacks & Biscuits",
                "Spices & Masalas",
                "Beverages & Drinks",
                "Personal Care",
                "Household Essentials",
                "Instant & Packaged Food",
                "Baby & Pet Care"
            ],
        },
        price: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true
        },
        unit: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
            enum: ["kg", "g", "l", "ml", "pcs", "dozen", "pack"]
        },
        image: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true,
            sparse: true,
        }
    },
    {
        timestamps: true
    }
)

const GroceryModel = mongoose.models.Grocery as mongoose.Model<IGrocery> || mongoose.model<IGrocery>("Grocery", GrocerySchema);

export default GroceryModel;
