import mongoose from "mongoose";

const dataBaseUrl = process.env.DATABASE_URL;

// se meu database nao existir ele me retorna uma mensagem de erro
if (!dataBaseUrl) {
    throw new Error("ENV nao preenchido!!!!!!");
    
}

// estabelecendo a conexao


const connectMongo = async()=>{
    if(mongoose.connection.readyState>0){
        return; //ja estou conectado 
    }else{
        return await mongoose.connect(dataBaseUrl) //se nao estiver conectado ele vai conectar
        .then("mongo DB conectado!!!!")
        .catch(err=>console.error(err));
    }
}

export default connectMongo;