const fraudRules = [
    {
        description: "High amount transaction",
        check: (transaction) => transaction.amount > 1000, // Example threshold
        score: 50,
    },
    {
        description: "Multiple transactions from the same card within a short period",
        check: (transaction, recentTransactions) => {
            const transactionsFromSameCard = recentTransactions.filter(t => t.cardNumber === transaction.cardNumber);
            return transactionsFromSameCard.length > 3; // Example threshold
        },
        score: 70,
    },
    // Add more rules as needed
];

function evaluateTransaction(transaction, recentTransactions) {
    let totalScore = 0;
    fraudRules.forEach(rule => {
        if (rule.check(transaction, recentTransactions)) {
            totalScore += rule.score;
        }
    });
    return totalScore;
}

module.exports = { evaluateTransaction };
