import connectMongo from '@/utils/mongodb';
import Todo from '@/models/todo';
import { NextResponse } from 'next/server';

// criando uma funcao tipo get
export async function GET() {
  await connectMongo();
  // estabeleci a conexao
  try {
    const todos = await Todo.find({});  //ele pega toos os obejetos
    return NextResponse.json({ success: true, data: todos }); //aqui ele retorna para mim os objetos
  } catch (error) { //caso de erro, ele retorna o erro
    return NextResponse.json({ success: false }, { status: 400 });
  }
}


export async function POST(req) {
  await connectMongo();
  try {
    const data = await req.json(); //convertendo conteudo para o json
    const todo = await Todo.create(data); 
    return NextResponse.json({ success: true, data: todo }); //se tudo der certo, volta os valores do json
  } catch (error) { //se nao, da erro
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

//GET E UM METODO QUE NAO PRECISA DE ID, ELE FAZ UM SOLICITACAO SEM PARAMETRO. 
// POST TA CRIANDO UM ID, ELE TAMBEM NAO PRECISA DA INFORMACAO DO ID