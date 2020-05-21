/* Dependencies */
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import compression from "compression";

import indexRoutes from "./routes/indexRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

class Server {
  public app: express.Application;

  constructor() {
    /* Initializations */
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    /* Connected DB */
    const MONG_URI = "mongodb://localhost/restapitypescriptuno";
    mongoose
      .connect(MONG_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
      })
      .then(() => console.log("Db Is Connected"))
      .catch((err) => console.log(err));

    /* Settings */
    this.app.set("port", process.env.PORT || 3000);

    /* Middlewares */
    /* Antes Venian en bodyParser Ya estan en express */
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("dev"));
    this.app.use(compression());
  }

  /* Routes */
  routes() {
    this.app.use(indexRoutes);
    this.app.use("/api", postRoutes);
    this.app.use("/api", userRoutes);
  }

  /* Starting The Server */
  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server On Port ${this.app.get("port")}`);
    });
  }
}

/* Instancia */
const server = new Server();
server.start();
