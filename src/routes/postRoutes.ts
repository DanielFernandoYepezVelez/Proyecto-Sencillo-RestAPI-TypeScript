import { Request, Response, Router } from "express";
import Post from "../models/post";

class PostRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getPosts(req: Request, res: Response): Promise<void> {
    const posts = await Post.find();

    res.json({
      posts,
    });
  }

  public async getPost(req: Request, res: Response): Promise<void> {
    const { url } = req.params;

    const postUrl = await Post.findOne({ url });

    res.json({
      post: postUrl,
    });
  }

  public async createPost(req: Request, res: Response): Promise<void> {
    const { title, url, content, image } = req.body;

    const newPost = new Post({
      title,
      url,
      content,
      image,
    });

    await newPost.save();

    res.json({
      data: newPost,
    });
  }

  public async updatePost(req: Request, res: Response): Promise<void> {
    const { url } = req.params;
    const { title, content, image } = req.body;

    const updatePost = await Post.findOneAndUpdate(
      { url },
      {
        title,
        url,
        content,
        image,
      },
      { new: true }
    );

    res.json({
      updateData: updatePost,
    });
  }

  public async deletePost(req: Request, res: Response): Promise<void> {
    const { url } = req.params;

    await Post.findOneAndDelete({ url });

    res.json({
      ok: true,
      message: "Eliminado Satisfactoriamente",
    });
  }

  routes() {
    this.router.get("/posts", this.getPosts);
    this.router.get("/post/:url", this.getPost);
    this.router.post("/post", this.createPost);
    this.router.put("/post/:url", this.updatePost);
    this.router.delete("/post/:url", this.deletePost);
  }
}

const postRoutes = new PostRoutes();
export default postRoutes.router;
