const AddressModel = require("./models/addressModel");

const addAddressController = async (req, res) => {
  try {
    const userId = req.userId;

    const { address_line, city, state, pincode, country, mobile } = req.body;

    const createAddress = new AddressModel({
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
      userId: userId,
    });

    const saveAddress = await createAddress.save();

    const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: saveAddress._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal error",
      error: error.message,
    });
  }
};
