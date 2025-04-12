const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { v4: uuidV4 } = require("uuid");

const { connectDB } = require("../utils/db_connect");

router.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./files_manage";
  form.keepExtensions = true; // 保持文件的原始扩展名

  form.parse(req, (_err, fields, files) => {
    const file = files.file[0]; // file 可能是数组 多个文件上传的
    // const fileType = fields.type[0]; // 文件类型

    const oldPath = file.filepath;
    const fileNameUUID = uuidV4();
    const extname = path.extname(file.originalFilename);
    const newFilename = fileNameUUID + extname;

    const newPath = "./files_manage/" + newFilename;

    if (!fs.existsSync("./files_manage")) {
      fs.mkdirSync("./files_manage", { recursive: true });
    }

    // 将文件从临时目录移动到指定目录
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.log("文件上传失败: ", err);
        res.json({
          code: 400,
          message: "文件上传失败",
          data: null,
        });
        return;
      }

      // 返回可访问的文件路径
      const serverPath =
        process.env.API_URL +
        ":" +
        process.env.FILE_PORT +
        /files_manage/ +
        newFilename;

      res.json({
        code: 200,
        message: "success",
        data: {
          url: serverPath,
        },
      });
    });
  });
});

module.exports = router;
