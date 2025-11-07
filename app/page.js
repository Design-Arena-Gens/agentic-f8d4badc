'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [expenses, setExpenses] = useState([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')

  useEffect(() => {
    const saved = localStorage.getItem('expenses')
    if (saved) {
      setExpenses(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (e) => {
    e.preventDefault()
    if (!description || !amount) return

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    }

    setExpenses([newExpense, ...expenses])
    setDescription('')
    setAmount('')
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  const categoryColors = {
    Food: '#FF6B6B',
    Transport: '#4ECDC4',
    Entertainment: '#FFE66D',
    Shopping: '#A8E6CF',
    Bills: '#95E1D3',
    Other: '#C7CEEA'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          margin: '0 0 1rem 0',
          fontSize: '2rem',
          fontWeight: '700',
          color: '#2D3748'
        }}>Expense Tracker</h1>

        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem',
          color: 'white'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Expenses</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>${total.toFixed(2)}</div>
        </div>

        <form onSubmit={addExpense} style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '2px solid #E2E8F0',
              borderRadius: '10px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '2px solid #E2E8F0',
              borderRadius: '10px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '2px solid #E2E8F0',
              borderRadius: '10px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              outline: 'none',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Other</option>
          </select>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Add Expense
          </button>
        </form>

        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {expenses.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#A0AEC0',
              fontSize: '1rem'
            }}>
              No expenses yet. Add one to get started!
            </div>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  background: '#F7FAFC',
                  borderRadius: '10px',
                  borderLeft: `4px solid ${categoryColors[expense.category]}`,
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>
                    {expense.description}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#718096' }}>
                    {expense.category} • {new Date(expense.date).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2D3748' }}>
                    ${expense.amount.toFixed(2)}
                  </div>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    style={{
                      background: '#FC8181',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#F56565'}
                    onMouseOut={(e) => e.target.style.background = '#FC8181'}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
