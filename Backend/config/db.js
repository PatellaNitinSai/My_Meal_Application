const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://nitinsaipatella1234:Nitin12sai@cluster0.qvumu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Manu');
        console.log(`Mongoose Connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;
