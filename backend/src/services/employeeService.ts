import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEmployees = () => {
  return prisma.employee.findMany({
    include: { role: true }
  });
};

export const getEmployeeById = (id: number) => {
  return prisma.employee.findUnique({
    where: { id },
    include: { role: true }
  });
};
