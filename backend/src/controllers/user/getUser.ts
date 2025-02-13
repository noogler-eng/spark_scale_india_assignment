import prisma from "../../db/index";

const getUser = async (req: any, res: any) => {
    const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
    select: {
      id: true,
      email: true,
      isAdmin: true,
    },
  });

  res.json({
    msg: "this is user router",
    user: user,
  });
};

export default getUser;
