const fs =  require("fs");
const makeId = require("../pkg/strings");

const MAX_FILESIZE = 1048576;
const ALLOWED_FILETYPES = [
    "image/jpeg",
    "image/png",
    "image/pjpeg",
    "image/gif",
];

const upload = async (req, res) => {
    console.log("files", req.files);
    if (MAX_FILESIZE < req.files.image.size) {
        return res.status(400).send("File exceeds max file size!");
    }
    
    if (!ALLOWED_FILETYPES.includes(req.files.image.mimetype)) {
        return res.status(400).send("Filetype not allowed!");
    }
    let userDir = `user_${req.auth.id}`;
    let userDirPath = `${__dirname}/../uploads/${userDir}`;

    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }
    let fileName = `${makeId(6)}_${req.files.image.name}`;
    let filePath = `${userDirPath}/${fileName}`;
    req.files.image.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send("Internal Server Error");
        }
        res.status(201).send({ file_name: fileName });
    })
};

const download = async (req, res) => {
    let userDir = `user_${req.auth.id}`;
    let userDirPath = `${__dirname}/../uploads/${userDir}`;
    let filePath = `${userDirPath}/${req.params.filename}`;
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found");
    }
    res.download(filePath);
  };

  const listFilesForUser = async (req, res) => {
    let userDir = `user_${req.auth.id}`;
    let userDirPath = `${__dirname}/../uploads/${userDir}`;
    fs.readdir(userDirPath, (err, files) => {
        if (err) {
            return res.status(500).send("Internal Server Error");
        }
        return res.status(200).send(files);
    });
};

const removeFile = async (req, res) => {
    let userDir = `user_${req.auth.id}`;
    let userDirPath = `${__dirname}/../uploads/${userDir}`;
    let filePath = `${userDirPath}/${req.params.filename}`;
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send("Internal Server Error");
        }

        // da se procita dir
        fs.readdir(userDirPath, (err, files) => {
            if (err) {
                return res.status(500).send("Internal Server Error");
            }

            // ako dir e prazen
            if (files.length === 0) {
                fs.rmdir(userDirPath, (err) => {
                    if (err) {
                        return res.status(500).send("Internal Server Error");
                    }
                    res.status(200).send("File deleted successfully and user directory deleted!");
                });
            }else {
        return res.status(200).send("File deleted successfully!");
            }
    });
});
};
  module.exports = {
    upload,
    download,
    listFilesForUser,
    removeFile,
  };

