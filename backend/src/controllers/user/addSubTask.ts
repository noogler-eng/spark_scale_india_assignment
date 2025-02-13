import prisma from "../../db";

export const addSubTask = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { assignedToEmail, startDate, dueDate, status, remarks } = req.body;

    if (!assignedToEmail || !startDate || !dueDate || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find parent task
    const parentTask = await prisma.task.findUnique({ where: { id } });
    if (!parentTask) {
      return res.status(404).json({ error: "Parent task not found" });
    }

    const assignedUser = await prisma.user.findUnique({
      where: { email: assignedToEmail },
    });

    if (!assignedUser) {
      return res.status(404).json({ error: "User with this email not found" });
    }

    // Create subtask
    const subtask = await prisma.task.create({
      data: {
        projectId: parentTask.projectId,
        assignedToId: assignedUser.id,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate),
        status,
        remarks,
        parentTaskId: id,
      },
    });

    res.status(201).json({ message: "Subtask added successfully", subtask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add subtask" });
  }
};

export default addSubTask;