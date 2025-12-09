const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const shortid = require("shortid");

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const tx = await Transaction.find().sort({ date: -1 });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE transaction
router.post("/", async (req, res) => {
  try {
    const { items, totalItems, totalPrice, customer, paymentStatus } = req.body;
    const newTx = new Transaction({
      transactionId: shortid.generate(),
      items,
      totalItems,
      totalPrice,
      customer,
      paymentStatus,
    });
    const saved = await newTx.save();
    res.json(saved);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// get one
router.get("/:id", async (req, res) => {
  try {
    const t = await Transaction.findById(req.params.id);
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
