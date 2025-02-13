import prisma from "../../db/index";

const getAllTasks = async (req: any, res: any) => {
  const { userId, isAdmin } = req.user;
  if (!isAdmin) return res.status(400).json({ error: "you are not admin" });

  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        assignedTo: true,
        subtasks: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export default getAllTasks;
