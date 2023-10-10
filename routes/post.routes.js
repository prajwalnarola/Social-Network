const postController = require("../controller/post.controller");

const multer = require("multer");

var express = require("express");

var router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,"./uploadPost");
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+ '-' +file.fieldname+'-'+file.originalname);
    }
})

const upload = multer({storage,
    fileFilter: (req, file, cb) => {
        // const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
        const allowedMimes = ['image/jpeg', 'image/png', 'video/mp4'];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true); // Accept the file
        } else {
          cb(new Error('Invalid file type. Only JPEG, PNG, MP4 files are allowed.'), false); // Reject the file
        }
      },
});

router.post("/addPost", upload.single('imageOrVideoURL'), postController.addPost);
router.get("/getPost", postController.getPost);
router.put("/likePost", postController.likePost);
router.delete("/deletePost", postController.deletePost);

// router.post("/addPost", postController.addPost);

module.exports = router;