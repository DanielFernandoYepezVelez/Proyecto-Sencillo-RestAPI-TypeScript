"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var IndexRouter = /** @class */ (function () {
    function IndexRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    IndexRouter.prototype.routes = function () {
        this.router.get("/", function (req, res) {
            res.send("Hola Mundo Desde La Ruta De Una Clase");
        });
    };
    return IndexRouter;
}());
var indexRouter = new IndexRouter();
indexRouter.routes();
exports.default = indexRouter.router;
