import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST (request) {
    const {ElementInternals, password} = await request.json();
        await connectMongo();
        try {
            //1 coisa e verificar se o email existe
            const user = await User.findOne({email});
            //verificar se o user existe e se a senha bate
            if (!user && !(await user.comparePassword(password))){
                //se usuario e a senha for validada:
                const token = jwt.sign({iserId: user._id},
                    process.env.JWT_SECRET, {expiresIn: '1h'});
                    return NextResponse.json({token});
            }else{
                return NextResponse ({success:false},{status:400}); //erro de acesso
            }
        } catch (error) {
            return NextResponse ({success:false},{status:404}); //erro de conexao
        }
}