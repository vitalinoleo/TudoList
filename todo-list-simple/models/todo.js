
import mongoose from 'mongoose';


const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});


export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

// o que esse codigo faz? criando os campos da tabela
// relacionando o model com a minha colecao
// o que seria essa colecao?
// colecao do banco banco de dados que criamos no mongoDB

