const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const morgan = require('morgan')
const app = express()
const hostname = '0.0.0.0'
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorHandler')
require('dotenv').config()

connectDB()
app.use(express.json())

app.use(errorHandler)
app.use(cors())
//app.use(morgan('dev'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/product', require('./routes/productRoute'))
app.use('/api/category', require('./routes/catRoute'))

app.get('/', (req, res) => {
   res.send('hello from simple server :)')
})

app.listen(port, hostname, () => console.log('--->>> Server is up and running on port : ' + port))