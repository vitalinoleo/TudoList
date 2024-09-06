import mongoose from "mongoose";

//criando a estrutura da minha colecao!!!!
const TodoSchema = new mongoose.Schema ({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String
    },
    status:{
        type:String,
        enum:["Pendente", "Em progresso", "concluido"],
        default:"pendente"
    }
});

const Todo = mongoose.models.Todo || mongoose.models("Todo",TodoSchema);

export default Todo;