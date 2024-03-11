const mongoose = require("mongoose");
const uri = `mongodb+srv://ketibuckoska:<password>@cluster0.qzdzfnq.mongodb.net/Semos?retryWrites=true&w=majority`;

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Mongo connected!");
    } catch(err) {
        console.log(err.message);
    }
}

connect();
