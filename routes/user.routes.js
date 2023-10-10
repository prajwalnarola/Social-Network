const userController = require("../controller/user.controller");

const multer = require("multer");

var express = require("express");

var router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,"./uploadProfileImage");
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

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/profile-info", upload.single('profilePicture'), userController.profileInfo);
router.get("/getprofileinfo", userController.getProfileInfo);
router.put("/updateFullname", userController.updateFullname);
router.post("/updateProfilePicture", upload.single('profilePicture'), userController.updateProfilePicture);
router.put("/updateBio", userController.updateBio);
router.put("/changePassword", userController.changePassword);
router.delete("/deleteProfile", userController.deleteProfile);




module.exports = router;
