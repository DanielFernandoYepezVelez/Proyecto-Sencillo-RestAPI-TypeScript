"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updateAt: Date,
});
exports.default = mongoose_1.model("Post", postSchema);
/* Las Imagenes Se pueden almacenar dentro de la base de datos, pero no es algo muy común,
de hecho las imagenes se almacenan en sistemas de ficheros, es decir se almacenan en el mismo computador del usuario, pero los datos o la direccion de la ubicación de la imagen se almacena dentro de la base de datos. Ya que tener una consulta en el disco duro es mas rapido, que realizar una consulta desde la base de datos.*/
