import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  req.send("Hello everyone");
});
app.post("/payment", async (req, res) => {
  let { amount } = req.body;

  var instance = new Razorpay({
    key_id: "rzp_test_ChLIiyCkSS7Ju8",
    key_secret: "ARIXVs2t05XGgj7FCOnpalrS",
  });

  let order = await instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  });
  res.status(201).json({
    success: true,
    order,
    amount,
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
