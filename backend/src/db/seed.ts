import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: "securepassword",
      isAdmin: true,
    },
  });

  // Create Regular User
  const regularUser = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      password: "securepassword",
      isAdmin: false,
    },
  });

  // Create a Project
  const project = await prisma.project.create({
    data: {
      name: "Demo Project",
      ownerId: adminUser.id,
      startDate: new Date("2024-10-01"),
      dueDate: new Date("2024-10-15"),
    },
  });

  // Create Main Task
  const mainTask = await prisma.task.create({
    data: {
      projectId: project.id,
      assignedToId: regularUser.id,
      startDate: new Date("2024-10-01"),
      dueDate: new Date("2024-10-15"),
      completionDate: new Date("2024-10-15"),
      status: "COMPLETED",
      remarks: "Main task completed successfully.",
    },
  });

  // Create Subtask
  await prisma.task.create({
    data: {
      projectId: project.id,
      parentTaskId: mainTask.id,
      assignedToId: regularUser.id,
      startDate: new Date("2024-10-02"),
      dueDate: new Date("2024-10-10"),
      status: "ONGOING",
      remarks: "This is a subtask under main task.",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
