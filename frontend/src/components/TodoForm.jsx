import React, { useState } from 'react'

export default function TodoForm({ onAdd }) {

    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return alert("Please enter a todo");
        onAdd({ title });
        setTitle(" ");
    }

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            <input 
                type="text" 
                placeholder='Add a new todo...'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='todo-input'
            />
            <button type='submit' className='add-btn'>
                Add
            </button>
        </form>
    );
}