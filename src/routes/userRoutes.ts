import { Request, Response, Router } from "express";

import User from "../models/user";

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    const users = await User.find();

    res.json({
      users,
    });
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    /* POPULATE => Poblando Datos Que El Usuario Necesita, EL MENOS(-) no muestra los campos que los tenga */
    const userUrl = await User.findOne({ username }).populate(
      "posts",
      "title url -_id"
    );

    res.json({
      user: userUrl,
    });
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const { name, username, email, posts } = req.body;

    const newUser = new User({
      name,
      username,
      email,
      posts,
    });

    await newUser.save();

    res.json({
      data: newUser,
    });
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    const { name, email, posts } = req.body;

    const updateUser = await User.findOneAndUpdate(
      { username },
      {
        name,
        username,
        email,
        posts,
      },
      { new: true }
    );

    res.json({
      updateData: updateUser,
    });
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    await User.findOneAndDelete({ username });

    res.json({
      ok: true,
      message: "Usuario Eliminado Satisfactoriamente",
    });
  }

  routes() {
    this.router.get("/users", this.getUsers);
    this.router.get("/user/:username", this.getUser);
    this.router.post("/user", this.createUser);
    this.router.put("/user/:username", this.updateUser);
    this.router.delete("/user/:username", this.deleteUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
