import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllRoles = async () => {
  return prisma.role.findMany();
};

export const getRoleById = async (id: number) => {
  return prisma.role.findUnique({
    where: { id }
  });
};
