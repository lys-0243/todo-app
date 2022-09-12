import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { FaPlus } from 'react-icons/fa'

import '../../styles/form.css'


export function Form({ onSubmit }) {
  const [taskName, setTaskName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if(!!taskName) {
      const newTask = {
        id: uuid(),
        name: taskName,
        completed: false,
      }

      onSubmit(newTask)
      setTaskName('')
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>

      <input className='input_form' value={taskName} type="text" placeholder="Ajouter une nouvelle tâche"
      onChange={event => setTaskName(event.target.value)} />

      <button type="submit"
        disabled={taskName === ''}
        className="form__button"
      >
        <FaPlus size={12} />
        Ajouter
      </button>
    </form>
  )
}