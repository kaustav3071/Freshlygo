import mongoose from "mongoose";

let Cache = global.mongoose;
if (!Cache) {
    Cache = global.mongoose = { conn: null, promise: null };
}


const connectDB = async () => {
    if (Cache.conn) {
        return Cache.conn;
    }
    if (!Cache.promise) {
        Cache.promise = mongoose.connect(process.env.MONGODB_URL!).then((conn) => conn.connection);
    }
    try {
        const conn = await Cache.promise;
        return conn;
    }
    catch (error) {
        console.log(error);
    }
}


export default connectDB;