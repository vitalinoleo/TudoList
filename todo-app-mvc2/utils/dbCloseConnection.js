import mongoose from "mongoose";

//serve para disconectar ,
// depois do controller
//abri coneccao, controller, fecha coneccao. essa e a linhagem
const closeconnectionMongo = async()=>{
if (mongoose.connection,readyState>0) {
    mongoose.disconnect;
}

}

export default closeconnectionMongo;