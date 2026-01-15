const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // 1. Total Income & Expense
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // 2. Last 60 Days Income (Was missing in your code!)
        const last60daysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const incomeLast60days = last60daysIncomeTransactions.reduce((sum, txn) => sum + txn.amount, 0);

        // 3. Last 30 Days Expense
        const last30daysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const expenseLast30Days = last30daysExpenseTransactions.reduce((sum, txn) => sum + txn.amount, 0);

        // 4. Recent Transactions
        const recentIncome = await Income.find({ userId }).sort({ date: -1 }).limit(5);
        const recentExpense = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

        const lastTransactions = [
            ...recentIncome.map((txn) => ({ ...txn.toObject(), type: "income" })),
            ...recentExpense.map((txn) => ({ ...txn.toObject(), type: "expense" }))
        ].sort((a, b) => b.date - a.date).slice(0, 5);

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30daysExpense: { total: expenseLast30Days, transactions: last30daysExpenseTransactions },
            last60DaysIncome: { total: incomeLast60days, transactions: last60daysIncomeTransactions },
            recentTransactions: lastTransactions,
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};