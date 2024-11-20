const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://nitinsaipatella1234:Nitin12sai@cluster0.iohfco5.mongodb.net/Manu');
        console.log(`Mongoose Connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;