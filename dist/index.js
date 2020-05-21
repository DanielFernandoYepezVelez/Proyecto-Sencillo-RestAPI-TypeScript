"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Dependencies */
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var compression_1 = __importDefault(require("compression"));
var indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
var postRoutes_1 = __importDefault(require("./routes/postRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var Server = /** @class */ (function () {
    function Server() {
        /* Initializations */
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        /* Connected DB */
        var MONG_URI = "mongodb://localhost/restapitypescriptuno";
        mongoose_1.default
            .connect(MONG_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
        })
            .then(function () { return console.log("Db Is Connected"); })
            .catch(function (err) { return console.log(err); });
        /* Settings */
        this.app.set("port", process.env.PORT || 3000);
        /* Middlewares */
        /* Antes Venian en bodyParser Ya estan en express */
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(morgan_1.default("dev"));
        this.app.use(compression_1.default());
    };
    /* Routes */
    Server.prototype.routes = function () {
        this.app.use(indexRoutes_1.default);
        this.app.use("/api", postRoutes_1.default);
        this.app.use("/api", userRoutes_1.default);
    };
    /* Starting The Server */
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get("port"), function () {
            console.log("Server On Port " + _this.app.get("port"));
        });
    };
    return Server;
}());
/* Instancia */
var server = new Server();
server.start();
