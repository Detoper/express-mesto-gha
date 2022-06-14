const router = require("express").Router();

const {
  getCardsController,
  createCardController,
  deleteCardController,
  addLikeController,
  removeLikeController,
} = require("../controllers/cards");

router.get("/cards", (req, res) => {
  getCardsController(req, res);
});

router.post("/cards", (req, res) => {
  createCardController(req, res);
});

router.delete("/cards/:cardId", (req, res) => {
  deleteCardController(req, res);
});

router.put("/cards/:cardId/likes", (req, res) => {
  addLikeController(req, res);
});

router.delete("/cards/:cardId/likes", (req, res) => {
  removeLikeController(req, res);
});

module.exports = router;
