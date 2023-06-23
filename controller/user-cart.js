import Cart from "../model/cart-schema.js";

export const add_to_Cart = async (req, res) => {
  try {
    const { user_id, number_of_product } = req.body;
    const cart_schema = await new Cart({ user_id, number_of_product });
    await cart_schema.save();
    res.status(200).send(cart_schema);
  } catch (err) {
    res.status(500).send("Cart error: ", err);
  }
};

export const Get_Cart = async (req, res) => {
  try {
    const cart_items = await new Cart.find({ user_id: req.params._id });

    console.log("data");
    res.status(200).send(cart_items);
  } catch (err) {
    res.status(500).send("Cart error: ", err);
  }
};

export const delete_from_Cart = async (req, res) => {
  try {
    const cart_items = await new Cart.findById(req.params._id);
    await cart_items.delete();
    res.status(200).send(cart_items);
  } catch (err) {
    res.status(500).send("Cart error: ", err);
  }
};
