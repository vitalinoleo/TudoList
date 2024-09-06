import Todo from "@/models/Todo";
import closeconnectionMongo from "@/utils/dbCloseConnection";
import connectMongo from "@/utils/dbConnect";
 
//criando meu CRUD
export const getTodos = async()=>{
    await connectMongo();
    return await Todo.find({});
}

export const createTodo = async (data)=>{
    await connectMongo();
    return await Todo.create(data);

};
//metodo para atualizar uma unica tarefa
 export const updateTodo = async(id,data) =>{
    await connectMongo();
    return (
        (await Todo.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }))
    );
 };
 //metodo para deletar uma unica tarefa
 export const deleteTodo = async (id) => {
    await connectMongo();
    return await Todo.deleteOne({ _id: id });
 };