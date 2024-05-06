const express = require('express');
const connectDB = require('./DB/db');
const Customer = require('./DB/Customer'); // Import the Customer model
const PurchaseOrder = require('./DB/PurchaseOrder'); // Import the PurchaseOrder model
const ShippingDetails = require('./DB/ShippingDetails')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(express.json());

// Routes
app.post('/addform/customer', async(req, res) => {
    try {
        const { name, email, mobileNumber, city } = req.body;

        // Validate request data
        if (!name || !email || !mobileNumber || !city) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new customer instance
        const newCustomer = new Customer({ name, email, mobileNumber, city });

        // Save the customer to the database
        await newCustomer.save();

        // Respond with the created customer
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/addform/customer', async(req, res) => {
    try {
        const { name, email, mobileNumber, city } = req.body;

        // Validate request data
        if (!name || !email || !mobileNumber || !city) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new customer instance
        const newCustomer = new Customer({ name, email, mobileNumber, city });

        // Save the customer to the database
        await newCustomer.save();

        // Respond with the created customer
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.post('/addform/purchaseform', async(req, res) => {
    try {
        const { productName, quantity, pricing, mrp, customerId } = req.body;
        console.log(customerId)
            // Validate request data
        if (!productName || !quantity || !pricing || !mrp) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new purchase order instance
        const newPurchaseOrder = new PurchaseOrder({ productName, quantity, pricing, mrp, customerId });

        // Save the purchase order to the database
        await newPurchaseOrder.save();

        // Respond with the created purchase order
        res.status(201).json(newPurchaseOrder);
    } catch (error) {
        console.error('Error creating purchase order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//add shipping detail form
app.post('/addform/shippingdetail', async(req, res) => {
    try {
        const { purchaseOrderId, customerId, address, city, pincode } = req.body;
        console.log(customerId);

        // Validate request data
        if (!purchaseOrderId || !customerId || !address || !city || !pincode) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new purchase order instance
        const newPurchaseOrder = new ShippingDetails({ purchaseOrderId, customerId, address, city, pincode });

        // Save the purchase order to the database
        await newPurchaseOrder.save();

        // Respond with the created purchase order
        res.status(201).json(newPurchaseOrder);
    } catch (error) {
        console.error('Error creating purchase order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//custimer data
app.get('/customer', async(req, res) => {
    try {
        const customers = await Customer.find(); // Use Customer model to find customers
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
//purchase data
app.get('/purchase', async(req, res) => {
    try {
        const purchase = await PurchaseOrder.find(); // Use Customer model to find customers
        res.json(purchase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
//shipping detail
app.get('/shipping', async(req, res) => {
    try {
        const purchase = await ShippingDetails.find(); // Use Customer model to find customers
        res.json(purchase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});