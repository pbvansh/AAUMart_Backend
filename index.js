const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const morgan = require('morgan')
const app = express()
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const hostname = '0.0.0.0'
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorHandler')
require('dotenv').config()

connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(helmet())
app.use(errorHandler)
app.use(cors())
app.use(cookieParser())
// app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));
//app.use(morgan('dev'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/product', require('./routes/productRoute'))
app.use('/api/category', require('./routes/catRoute'))
app.use('/api/cart',require('./routes/cartRoute'))
app.use('/api/order',require('./routes/orderRoute'))

app.get('/', (req, res) => {
   res.send('hello from simple server :)')
})

app.listen(port, hostname, () => console.log('--->>> Server is up and running on port : ' + port))