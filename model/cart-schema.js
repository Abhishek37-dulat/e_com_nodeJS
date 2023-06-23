import { mongoose } from "mongoose";

const userCart = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  number_of_product: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("usercart", userCart);

export default Cart;
