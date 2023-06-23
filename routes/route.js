import express from "express";
import {
  getProducts,
  getProductById,
} from "../controller/product-controller.js";
import { userSignup, userLogin } from "../controller/user-controller.js";
import {
  addPaymentGateway,
  paytmResponse,
} from "../controller/payment-controller.js";
import {
  Get_Cart,
  add_to_Cart,
  delete_from_Cart,
} from "../controller/user-cart.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Listening to server...");
});
router.post("/signup", userSignup);
router.post("/login", userLogin);

router.get("/cart/:_id", Get_Cart);
router.post("/cart", add_to_Cart);
router.delete("/cart/:_id", delete_from_Cart);

router.get("/products", getProducts);
router.get("/product/:id", getProductById);

router.post("/payment", addPaymentGateway);
router.post("/callback", paytmResponse);
export default router;
