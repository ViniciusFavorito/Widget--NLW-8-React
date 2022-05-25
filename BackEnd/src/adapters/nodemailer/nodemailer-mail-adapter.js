"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6a6456db50df6a",
        pass: "23e423598dbc13"
    }
});
class NodemailerMailAdapter {
    async sendMail({ subject, body }) {
        await transport.sendMail({
            from: "Nelson da GR8 <tchucubira@gmail.com>",
            to: "Vinicius Favorito <vfavorito7@gmail.com>",
            subject,
            html: body
        });
    }
}
exports.NodemailerMailAdapter = NodemailerMailAdapter;
