import React, { useState } from 'react'
import Input from './Input'
import SelectMenu from './SelectMenu'

export default function ExpenseForm({expense, setExpense,setExpenses, editingRowId, setEditingRowId}) {

  // const [title, setTitle] = useState('')
  // const [category, setCategory] = useState('')
  // const [amount, setAmount] = useState('')
  // const [expense, setExpense] = useState({
  //   title: '',
  //   category: '',
  //   amount: '',
  // })

   const [errors, setErrors] = useState({})

   const validationConfig = {
        title: [
          { required: true, msg: 'Please enter title'}, {minLength: 2, msg: 'Title should be at least 5 characters long'}
        ],
        category: [ { required: true, msg: 'Please Choose Category'}],
        amount: [ { required: true, msg: 'Please enter an amount'}, {pattern: /^(0|[1-9]\d*)$/, msg: 'please enter only  number'}],
        email: [{required: true, msg: 'Please enter an email'}, {pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, msg: 'Please enter a valid email'}]
   }


   const validate = (formData) => {
    const errorData = {}

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if(rule.required && !value) {
           errorData[key] = rule.msg
           return true
        }

        if(rule.minLength && value.length < rule.minLength) {
          errorData[key] = rule.msg
          return true
       }

       if(rule.pattern && !rule.pattern.test(value)) {
          errorData[key] = rule.msg
          return true
       }
      })
          
    })
   

     setErrors(errorData)
     return errorData
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validateResult = validate(expense)
        if(Object.keys(validateResult).length)return

     if(editingRowId) {
        setExpenses((prevState) => 
        prevState.map((prevExpense) => {
        if(prevExpense.id === editingRowId) {
            return {...expense, id: editingRowId}
        }

        return prevExpense
      })
  )
  setExpense({
    title: '',
    category: '',
    amount: '',
  })
  setEditingRowId('')
  return
}

    setExpenses((prevState) => [
      ...prevState,
      {...expense, id: crypto.randomUUID()},
    ])

    setExpense({
      title: '',
      category: '',
      amount: '',
    })
  //  const expense = {title, category, amount, id: crypto.randomUUID()}
  //  setExpenses((prevState) => [...prevState, expense])

    // console.log(getFormData(e.target));
    // setExpenses((prevState) => [...prevState, {...getFormData(e.target), id: crypto.randomUUID()},])

    // e.target.reset()
  }

  // console.log(title);

  // const getFormData = (form) => {
  //   const data = new FormData(form)
  //   const entery = {}
  //   for(const [key,value] of data.entries()) {
  //     entery[key] = value
  //   }
  //   return entery  
  // }
  const handleChange = (e) => {
    const {name, value} = e.target
    setExpense((prevState) => (
      {
        ...prevState,
      [name]: value,
      }
    ))
     setErrors({})
  }

  return (
    <form className='expense-form' onSubmit={handleSubmit}>
    <Input label='Title' id="title" name="title" value={expense.title} onChange={handleChange} error={errors.title}/>

     <SelectMenu label="Category" id="category" name="category" value={expense.category} onChange={handleChange} options= {['Grocery', 'Clothes', 'Bills', 'Education', 'Medicine','OTT Platforms']} 
     defaultOption = "Select Category"
       error={errors.category}/>

     <Input label='Amount' id="amount" name="amount" value={expense.amount} onChange={handleChange} error={errors.amount}/>



    <button className='add-btn' style={{color:"#34568B"}}>{editingRowId? 'save' : 'Add'}</button>

  </form>
  )
}
