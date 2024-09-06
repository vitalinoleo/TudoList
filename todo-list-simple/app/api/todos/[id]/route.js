// delete e put 
// esse route vai funcionar para 
// criar  variacoes para o id, por isso esta dentro dos cochetes 
// aqui vai ficar os metodos que precisam de ID 
// metodos que precisam : PUT
// no route de dentro do id eles precisam usar um id do banco de dados, ou seje, ele puxa um id do banco, ja o routes de fora da pasta id, ele nao puxa nenhum id, ele cria o id, manda para o banco de dados criar.
// para fazer rodar o codigo no terminal nos precisamos rodar o seguinte código: npm run dev 


import connectMongo from '@/utils/mongodb';
import Todo from '@/models/todo';
import { NextResponse } from 'next/server';


export async function PUT(req, { params }) {
  await connectMongo();
  try {
    const data = await req.json();
    const todo = await Todo.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: todo });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) { //pegando os parametros 
    await connectMongo();
    try {
        const deletedTodo = await Todo.deleteOne({ _id: params.id });
        if (!deletedTodo) {
            return NextResponse.json({ success: false }, { status: 400 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
