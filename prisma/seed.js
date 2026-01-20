import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.service.deleteMany();

  const passwordHash = await hash("123456", 8);

  await prisma.user.createMany({
    data: [
      {
        name: "Rodrigo Gonçalvez",
        email: "rodrigo.g@gmail.com",
        password: passwordHash,
        role: "admin",
      },
      {
        name: "Breno Siriri",
        email: "breno.s@gmail.com",
        password: passwordHash,
        role: "client",
      },
      {
        name: "Henrique Vilcek Gonçalvez",
        email: "henrique.v@gmail.com",
        password: passwordHash,
        role: "client",
      },
      {
        name: "Vinicius Pereira",
        email: "vinicius.p@gmail.com",
        password: passwordHash,
        role: "client",
      },
      {
        name: "Cleiton Técnico",
        email: "cleiton.tech@gmail.com",
        password: passwordHash,
        role: "technical",
        hour: ["H08", "H09", "H10", "H11", "H12", "H14", "H15", "H16", "H17"],
      },
      {
        name: "Rafael Técnico",
        email: "rafael.tech@gmail.com",
        password: passwordHash,
        role: "technical",
        hour: ["H10", "H11", "H12", "H13", "H14", "H16", "H17", "H18", "H19", "H20"],
      },
      {
        name: "Brayan Técnico",
        email: "brayan.tech@gmail.com",
        password: passwordHash,
        role: "technical",
        hour: ["H12", "H13", "H14", "H16", "H18", "H19", "H20", "H21", "H22"],
      },
    ],
    skipDuplicates: true,
  });

  await prisma.service.createMany({
    data: [
      { name: "Backup", amount: 45.7 },
      { name: "Formatação do sistema", amount: 92.89 },
      { name: "Instalar o pacote office", amount: 119.99 },
      { name: "Montar o CPU", amount: 55 },
      { name: "Limpeza e manutenção da máquina", amount: 99.9 },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed executada com sucesso!");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
