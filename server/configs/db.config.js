const mongoose = require("mongoose");

const dbUrl = process.env.NODE_ENV == "test"? "mongodb://127.0.0.1:27017/todoTest":process.env.MongoUrl || "mongodb://127.0.0.1:27017/todo"

const mongooseConnectDB = async () => {
    try{
        const connectionResponse = await mongoose
          .connect(dbUrl, {
            useNewUrlParser: true,
          })
        console.log("Mongoose connected to ", connectionResponse.connections[0].host)

    }
    catch(err){
        console.log("error connecting to the database", err)
    }
}

module.exports = mongooseConnectDB;