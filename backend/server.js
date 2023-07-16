const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const baseUrl = process.env.BASE_URL;
const port = process.env.PORT || 3003;

app.get('/ping', (req, res) => {
    res.sendStatus(200);
});

app.post('/transactions', async (req, res) => {
    const { account_id, amount } = req.body;

    if (typeof account_id !== 'string' || isNaN(amount)) {
        return res.status(400).json({ error: 'Invalid account_id or amount' });
    }

    if (!req.is('application/json')) {
        return res.status(415).json({ error: 'Unsupported Media Type' });
    }

    try {
        const response = await axios.post(`${baseUrl}/transactions`, { account_id, amount });
        res.status(201).json(response.data);
    } catch (error) {
        const { status, data } = error.response;
        res.status(status).json(data);
    }
});

app.get('/transactions', async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/transactions`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.get('/transactions/:transaction_id', async (req, res) => {
    const { transaction_id } = req.params;

    if (typeof transaction_id !== 'string' || transaction_id.trim() === '') {
        return res.status(400).json({ error: 'Invalid transaction_id' });
    }

    try {
        const response = await axios.get(`${baseUrl}/transactions/${transaction_id}`);
        if (!response.data) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.get('/accounts/:account_id', async (req, res) => {
    const { account_id } = req.params;

    if (typeof account_id !== 'string' || account_id.trim() === '') {
        return res.status(400).json({ error: 'Invalid account_id' });
    }

    try {
        const response = await axios.get(`${baseUrl}/accounts/${account_id}`);
        if (!response.data) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
