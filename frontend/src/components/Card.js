import React from 'react';

const Card = ({ amount, account_id, balance, index, currentPage }) => (
    <div>
        <p>
            <i>Transferred </i>
            ${Math.abs(amount)} {' '}
            <strong>{amount < 0 ? 'From <--' : 'To -->'} </strong>
            <i>Account : </i>
            <span className="border border-success">{account_id}</span>
        </p>
        {index === 0 && currentPage === 1 && (
            <span className="border border-primary">
                <strong>The Current Balance Is </strong>
                ${balance}{' '}
            </span>
        )}
    </div>
);

export default Card;
