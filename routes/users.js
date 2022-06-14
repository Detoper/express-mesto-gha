const router = require("express").Router();

const {
  getUsersController,
  getUserController,
  createUserController,
  updateUserController,
  updateUserAvatarController,
} = require("../controllers/users");

router.get("/users", (req, res) => {
  getUsersController(req, res);
});

router.get("/users/:userId", (req, res) => {
  getUserController(req, res);
});

router.post("/users", (req, res) => {
  createUserController(req, res);
});

router.patch("/users/me", (req, res) => {
  updateUserController(req, res);
});

router.patch("/users/me/avatar", (req, res) => {
  updateUserAvatarController(req, res);
});

module.exports = router;
