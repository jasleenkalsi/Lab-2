import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function main() {
const roleNames = ["Manager", "Stylist", "Receptionist"];
const roles = await Promise.all(
roleNames.map((name) =>
prisma.role.upsert({ where: { name }, update: {}, create: { name } })
)
);


const [manager, stylist, receptionist] = roles;


await prisma.employee.upsert({
where: { email: "neena.manager@example.com" },
update: {},
create: {
firstName: "neenay",
lastName: "Nguyen",
email: "neena.manager@example.com",
roleId: manager.id
}
});
await prisma.employee.upsert({
where: { email: "bob.stylist@example.com" },
update: {},
create: {
firstName: "Bob",
lastName: "Singh",
email: "bob.stylist@example.com",
roleId: stylist.id
}
});
await prisma.employee.upsert({
where: { email: "cora.frontdesk@example.com" },
update: {},
create: {
firstName: "Cora",
lastName: "Lopez",
email: "cora.frontdesk@example.com",
roleId: receptionist.id
}
});
}


main()
.then(() => console.log("Seeded roles & employees"))
.catch((e) => {
console.error(e);
process.exit(1);
})
.finally(async () => prisma.$disconnect());