// Puerto
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// String connection
let urlDB = process.env.NODE_ENV === 'env'
? "mongodb+srv://moyamaker:U4SIm0RREM7fg7C0@cluster0-go734.mongodb.net/cafe"
: "mongodb://localhost:27017/cafe";

process.env.URL_DB = urlDB;