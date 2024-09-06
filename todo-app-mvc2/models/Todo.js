import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    //criando as chaves da minha colecao
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:false
    },
    status:{
        type:String,
        enum:["a fazer","fazendo","feito"],
    }
})

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

export default Todo;