import prisma from "../../db";

export const editTask = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { assignedToEmail, startDate, dueDate, status, remarks } = req.body;

    // Find the existing task
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    let assignedToId = task.assignedToId;

    // If email is provided, find new assigned user
    if (assignedToEmail) {
      const assignedUser = await prisma.user.findUnique({
        where: { email: assignedToEmail },
      });

      if (!assignedUser) {
        return res
          .status(404)
          .json({ error: "User with this email not found" });
      }

      assignedToId = assignedUser.id;
    }

    // Update the task
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        assignedToId,
        startDate: startDate ? new Date(startDate) : task.startDate,
        dueDate: dueDate ? new Date(dueDate) : task.dueDate,
        status: status || task.status,
        remarks: remarks !== undefined ? remarks : task.remarks,
      },
    });

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export default editTask;