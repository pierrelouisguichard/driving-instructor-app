const express = require("express");

const {
  signupUser,
  loginUser,
  sendInvitation,
  allUsers,
  pendingInvites,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.post("/invitation", sendInvitation);

router.get("/pendingInvites", pendingInvites);

router.get("/allUsers", allUsers);

router.delete("/:id", deleteUser);

module.exports = router;
