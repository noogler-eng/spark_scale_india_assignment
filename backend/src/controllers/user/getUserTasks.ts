import prisma from "../../db";

const getUsersTasks = async (req: any, res: any) => {
  try {
    const userId = req.user?.userId;
    const tasks = await prisma.task.findMany({
      where: { assignedToId: userId },
      include: { project: true },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user tasks" });
  }
};

export default getUsersTasks;
