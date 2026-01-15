const Expense = require("../models/Expense");
const xlsx = require('xlsx');

// 1. Add Expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        // Validation
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            source, 
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// 2. Get All Expenses 
exports.getAllExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        // Sort by date descending (newest first)
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 3. Delete Expense 
exports.deleteExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId });
        
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 4. Download Excel 
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expenses.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");
        
        const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });
        res.attachment("expenses.xlsx");
        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};