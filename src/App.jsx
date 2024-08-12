
import { useState } from 'react'
import ExpenseForm from '../Component/ExpenseForm'
import ExpenseTable from '../Component/ExpenseTable'
import './App.css'
import expenseData from './expenseData'
import { useLocalStorage } from '../hooks/useLocalStorage'

function App() {
  const [expense, setExpense] = useLocalStorage('expense',{
      title: '',
      category: '',
      amount: '',
    
  })
  const [expenses, setExpenses] = useLocalStorage('expenses',expenseData)
  const [editingRowId, setEditingRowId] = useLocalStorage('editingRowId',"")

 return (
  <main>
    <h1 style={{color: "white"}}>Track Your Expense</h1>
    <div className="expense-tracker">
    <ExpenseForm setExpenses={setExpenses} expense={expense} setExpense={setExpense} editingRowId={editingRowId} setEditingRowId={setEditingRowId}/>
    <ExpenseTable expenses={expenses} setExpense={setExpense} setExpenses={setExpenses} setEditingRowId={setEditingRowId}/>
    </div>
  </main>
  )
}

export default App
