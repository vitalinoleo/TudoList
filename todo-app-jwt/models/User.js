import mongoose from "mongoose";
//vamos armazenar senha
//então siginifica que vamos usar o bcrypt para esconder a senha, ou seja, temos que importar ele tambem
import bcrypt from "bcrypt";

//o que seria isso?
//e se eu criar meu usuario com email e senha e querer que ele inclua e acesse com o numero de telefone, posso incluir esse numero de telefone depois de ja criado?
//podemos fazer, tenho que incluir essa coluna na tabela

//criando a estrutura da minha colecao!!!!
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true //se eu nao colocar true, ele permite avancar sem preencher o campo
    }
});

//chamar Crypto
    // antes do metodo "save" savar vamos 
UserSchema.pre("save", async function name(params){
    if (!this.isModifield('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//metodo para comparar as senhas 
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
