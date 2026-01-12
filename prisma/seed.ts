import { prisma } from "@/database/prisma";

async function seed(){
    await prisma.user.createMany({
        data: [
            {
                name: "Rodrigo Gonçalvez",
                email: "rodrigo.g@gmail.com",
                password: "123456"
            }
        ]
    })
}






