const {MongoClient} = require("mongodb")

const url = 'mongodb://localhost:27017/myapp'
const client = new MongoClient(url)

let db;
const dbname = "nodehapi"

const main = async () =>{
    try {
        await client.connect();
        db = client.db(dbname)
        console.log("mongodb connected successfully :)");
    } catch (error) {
        console.log(error);
    }
}

exports.dbconnect =()=>{
    main()
}

exports.get =() =>{
    return db
}
