const mongoose = require('mongoose');
const PaymentMethod = require('../../src/models/paymentMethod'); // TODO: Update model to seed correct DB
require('dotenv').config();

const TARGET_USER_ID = '6960f715eaf17bb93c90fda2'; // TODO: Update if needed, or comment out if not needed

const seedData = [ // TODO: Update data!!!!
  {
    userId: TARGET_USER_ID,
    type: 'card',
    cardNumber: '**** **** **** 1234',
    cardHolder: 'John Doe',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  {
    userId: TARGET_USER_ID,
    type: 'bank_transfer',
    bankName: 'First Bank',
    accountNumber: '****7890',
    accountName: 'John Doe',
    isDefault: false
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas...');

    // Remove existing methods for THIS user only to avoid duplicates
    // await PaymentMethod.deleteMany({ userId: TARGET_USER_ID });
    // console.log(`Cleared existing payment methods for user: ${TARGET_USER_ID}`);

    await PaymentMethod.insertMany(seedData);
    console.log('Successfully seeded database!');

    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();

// Run node src/utils/seedDB in terminal to seed DB;