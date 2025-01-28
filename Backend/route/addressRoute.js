const express = require("express");
const auth = require("../middleware/auth.js");
const {
  addAddressController,
  deleteAddresscontroller,
  getAddressController,
  updateAddressController,
} = require("../controller/addressController.js");
const addressRouter = express.Router();

addressRouter.post("/create", auth, addAddressController);
addressRouter.get("/get", auth, getAddressController);
addressRouter.put("/update", auth, updateAddressController);
addressRouter.delete("/disable", auth, deleteAddresscontroller);

module.exports= addressRouter;
