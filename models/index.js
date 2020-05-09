var mongoose=require("mongoose");
mongoose.set('debug',true);
mongoose.connect("mongodb://localhost/todo_api", {useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false}).then(() => console.log('DB Connected!')).catch(err => {
console.log("DB Connection Error: ");
});

mongoose.Promise=Promise;
module.exports.Todo=require('./todo');