import prisma from "../../db";

const addTask = async (req: any, res: any) => {
  try {
    const { projectId, assignedToEmail, startDate, dueDate, status, remarks } =
      req.body;

    // Ensure required fields are present
    if (!projectId || !assignedToEmail || !startDate || !dueDate || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find user by email (assigned user)
    const assignedUser = await prisma.user.findUnique({
      where: { email: assignedToEmail },
    });

    if (!assignedUser) {
      return res.status(404).json({ error: "User with this email not found" });
    }

    // Create the parent task
    const task = await prisma.task.create({
      data: {
        projectId,
        assignedToId: assignedUser.id,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate),
        status,
        remarks,
        parentTaskId: null,
      },
    });

    res.status(201).json({ message: "Parent task added successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add task" });
  }
};

export default addTask;