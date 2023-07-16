import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ serverUrl, updateTransactionList, transactions }) => {
    const [accountId, setAccountId] = useState('');
    const [amount, setAmount] = useState('');

    // Get an array of account ids from the transactions
    const accountIds = transactions.map(({ account_id }) => account_id);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate account_id and amount before sending request to the server
        if (!accountId || isNaN(amount) || !accountIds.includes(accountId)) {
            alert('Please enter a valid account number and amount!');
            return;
        }

        try {
            const response = await axios.post(
                `${serverUrl}/transactions`,
                {
                    account_id: accountId,
                    amount: Number(amount),
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            // Update the transaction list with the new transaction
            updateTransactionList(response.data);

            // Clear the form
            setAccountId('');
            setAmount('');

            alert('Transaction completed successfully!');
        } catch (error) {
            console.error(error);
            alert('Transaction failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border">
            <div className="mb-3 p-1">
                <label htmlFor="accountId" className="form-label">
                    Account ID
                </label>
                <input
                    data-type="account-id"
                    type="text"
                    className="form-control"
                    id="accountId"
                    value={accountId}
                    onChange={(event) => setAccountId(event.target.value)}
                    required
                />
            </div>
            <div className="mb-3 p-1">
                <label htmlFor="amount" className="form-label">
                    Amount
                </label>
                <input
                    data-type="amount"
                    type="number"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    required
                />
            </div>
            <div className="d-grid gap-2 col-2 mx-auto p-1">
                <input data-type="transaction-submit" type="submit" className="btn btn-primary" />
            </div>
        </form>
    );
};

export default TransactionForm;
