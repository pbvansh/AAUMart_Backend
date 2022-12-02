const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        const URL = process.env.MONGO_URI;
        const conn = mongoose.connect(URL).then((conn)=>{
            console.log(conn.connection.host);
        })
        // console.log(conn.connection.host);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB