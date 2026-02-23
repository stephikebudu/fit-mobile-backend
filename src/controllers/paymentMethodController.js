const PaymentMethod = require("../../src/models/paymentMethod");

exports.getPaymentMethodsList = async (req, res) => {
  try {
    const authenticatedUserId = req.user.id; 

    const userMethods = await PaymentMethod.find({ userId: authenticatedUserId })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean();

    const formattedMethods = userMethods.map(method => ({
      id: method._id,
      type: method.type,
      isDefault: method.isDefault,
      // Card data
      ...(method.type === 'card' && {
        cardNumber: method.cardNumber,
        cardHolder: method.cardHolder,
        expiryMonth: method.expiryMonth,
        expiryYear: method.expiryYear
      }),
      // Bank data
      ...(method.type === 'bank_transfer' && {
        bankName: method.bankName,
        accountNumber: method.accountNumber,
        accountName: method.accountName
      })
    }));

    return res.status(200).json({
      success: true,
      data: {
        paymentMethods: formattedMethods
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}