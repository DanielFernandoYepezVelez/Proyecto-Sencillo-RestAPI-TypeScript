"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, require: true },
    createdAt: { type: Date, default: Date.now },
    posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
});
exports.default = mongoose_1.model("User", userSchema);
