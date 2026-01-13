import { prisma } from "@/database/prisma";

async function seed(){
    await prisma.user.createMany({
        data: [
            {
                name: "Rodrigo Gonçalvez",
                email: "rodrigo.g@gmail.com",
                password: "123456",
                role: "admin"
            },
            {
                name: "Breno Siriri",
                email: "breno.s@gmail.com",
                password: "123456"
            },
            {
                name: "Henrique Vilcek Gonçalvez",
                email: "henrique.v@gmail.com",
                password: "123456"
            },
            {
                name: "Cleiton Técnico",
                email: "cleiton.tech@gmail.com",
                password: "123456",
                role: "technical",
                hour: ["H08", "H09", "H10", "H11", "H12", "H14", "H15", "H16", "H17"]
            },
            {
                name: "Rafael Técnico",
                email: "rafael.tech@gmail.com",
                password: "123456",
                role: "technical",
                hour: ["H10", "H11", "H12", "H13", "H14", "H16", "H17", "H18", "H19", "H20"]
            },
            {
                name: "Brayan Técnico",
                email: "brayan.tech@gmail.com",
                password: "123456",
                role: "technical",
                hour: ["H12", "H13", "H14", "H13", "H16", "H18", "H19", "H20", "H21", "H22"]
            },
        ]
    })

    await prisma.service.createMany({
        data: [
            {
                name: "Backup",
                amount: 45.70
            },
            {
                name: "Formatação do sistema",
                amount: 92.89
            },
            {
                name: "Instalar o pacote office",
                amount: 119.99
            },
            {
                name: "Montar o CPU",
                amount: 55
            },
            {
                name: "Limpeza e manutenção da máquina",
                amount: 99.90
            }
        ]
    })
}






