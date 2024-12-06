import mongoose from "mongoose";

const connectDatabase  = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log('DB CONNECTED ' + conn.connection.host)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
};

export default connectDatabase;