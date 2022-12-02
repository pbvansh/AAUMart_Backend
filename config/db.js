const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        const URL = process.env.MONGO_URI;
        const conn = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
          })
        console.log(conn.connection.host);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB