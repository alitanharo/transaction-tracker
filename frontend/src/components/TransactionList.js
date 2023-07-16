import Card from "./Card";
import React, { useState } from "react";

const TransactionList = ({ transactions, balance }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(5);
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="border">
            <div className="mb-3">
                {currentTransactions.map((transaction, index) => (
                    <div
                        key={index}
                        className="border border-secondary rounded p-2 m-3"
                        data-type="transaction"
                        data-account-id={transaction.account_id}
                        data-amount={transaction.amount}
                        data-balance={transaction.balance}
                        data-transaction-id={transaction.transaction_id}
                    >
                        <Card
                            amount={transaction.amount}
                            balance={balance}
                            account_id={transaction.account_id}
                            index={index}
                            currentPage={currentPage}
                        />
                    </div>
                ))}
                <nav>
                    <ul className="pagination">
                        {transactionsPerPage < transactions.length &&
                            Array.from({
                                length: Math.ceil(transactions.length / transactionsPerPage),
                            }).map((_, i) => (
                                <li
                                    key={i}
                                    className={`page-item ${currentPage === i + 1 ? "active" : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => paginate(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default TransactionList;
