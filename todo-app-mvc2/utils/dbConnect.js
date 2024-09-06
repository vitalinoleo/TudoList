import mongoose from "mongoose";

//caso eu esqueca de colocar o database no .env ele vai me lembrar
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
    throw new Error("database nao esta listado no .env.local");

}
const connectMongo = async()=>{
    //essse if esta lendo o estado da conecção
    // se ele ler e me retornar 1 siginifica que eu estou conectado com o banco de dados
    if (mongoose.connection.readyState) {
        return;
        //caso ao contario
    }else{
        //se ele nao estiver conectado, ele faz a conecção
        mongoose.connect(databaseUrl)
        .then("mongoDB conectado")
        .catch(err=>console.error(err));
    }
}

export default connectMongo;
