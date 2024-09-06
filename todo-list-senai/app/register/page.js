import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import { NextResponse } from 'next/server';
import { signToken } from '../../../../utils/jwtUtils';


export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();


  try {
    let user = await User.findOne({ email }); //verificando se tem o email cadstrado
    if (user) {
      return NextResponse.json({ message: 'Usuário já existe.' }, { status: 400 });
    }


    user = new User({ name, email, password });
    await user.save(); //salvando as informacoes de usuario


    const token = signToken(user._id); //gerando a chave de autenticacao


    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao registrar usuário.' }, { status: 500 });
  }
}
