import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SERVER_URL } from './config';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${SERVER_URL}/transactions`);
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const lastTransaction = transactions.length ? transactions[0] : {};
        const { account_id: accountId = '' } = lastTransaction;
        const res = await axios.get(`${SERVER_URL}/accounts/${accountId}`);
        const { balance: newBalance } = res.data;
        setBalance(newBalance);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBalance();
  }, [transactions]);

  const updateTransactionList = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="container-fluid mt-2 app">
      <div className="row">
        <div className="col-md-12">
          <header>
            <h1 className="text-center ">Transaction Management</h1>
          </header>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <h3>Submit New Transaction</h3>
          <TransactionForm
            transactions={transactions}
            serverUrl={SERVER_URL}
            updateTransactionList={updateTransactionList}
          />
        </div>
        <div className="col-md-8">
          <h3>Transaction History</h3>
          <TransactionList balance={balance} transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default App;
