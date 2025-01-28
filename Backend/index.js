const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const connectDB = require("./config/database.js");

// Import routes
const userRouter = require("./route/userRoute.js");
const categoryRouter = require("./route/categoryRoute.js");
const uploadRouter = require("./route/uploadRoute.js");
const subCategoryRouter = require("./route/subCategoryRoute.js");
const productRouter = require("./route/productRoute.js");
const cartRouter = require("./route/cartRoute.js");
const addressRouter = require("./route/addressRoute.js");
const orderRouter = require("./route/orderRoute.js");

const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT =  process.env.PORT || 8000

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user',userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})
