import mongoose from "mongoose";

interface IGrocery {
    id?:mongoose.Types.ObjectId;
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
            sparse: true,
            validate: {
                validator: (v: string) => /^\S+$/u.test(v),
                message: 'Name cannot contain whitespace'
            }
        },
        category: {
            type: String, 
            required: true,
            trim: true,
            lowercase: true,
            index: true,
            unique: true,
            sparse: true,
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
            index: true,
            unique: true,
            sparse: true,
            validate: {
                validator: (v: string) => /^\S+$/u.test(v),
                message: 'Price cannot contain whitespace'
            }
        },
        unit: {
            type: String, 
            required: true,
            trim: true,
            lowercase: true,
            index: true,
            unique: true,
            sparse: true,
            validate: {
                validator: (v: string) => /^\S+$/u.test(v),
                message: 'Unit cannot contain whitespace'
            }
        },
        image: {
            type: String, 
            required: true,
            trim: true,
            lowercase: true,
            index: true,
            unique: true,
            sparse: true,
            validate: {
                validator: (v: string) => /^\S+$/u.test(v),
                message: 'Image cannot contain whitespace'
            }
        }
    },
    {
        timestamps: true
    }
)

const GroceryModel = mongoose.models.Grocery as mongoose.Model<IGrocery> || mongoose.model<IGrocery>("Grocery", GrocerySchema);

export default GroceryModel;
