import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";

// criando o metodo para fazer a navegacao 
//metodo do tipo POST
export async function POST(request) {
    //primeira coisa a se fazer aqui dentro é o json
    const data = await request.json();
    await connectMongo();

    try {
        const user = await User.create(data); //try esta tentando criar o usuario
        return NextResponse.json({success:true , data:user});
    } catch (error) {
        return NextResponse.json({seccess:false},{status:400}); // caso nao consiga, ele vai me retornar o erro 400
    }

}