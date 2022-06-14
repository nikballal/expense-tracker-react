const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionsController");

router.route("/").get(getTransactions);
router.route("/").post(addTransaction);
router.route("/:id").delete(deleteTransaction);

module.exports = router;
