// components/AddFood.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddFood = () => {
    const [food, setFood] = useState({ name: '', price: '', category: '', image: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/menu/add', food);
            alert('Food added successfully!');
            setFood({ name: '', price: '', category: '', image: '' }); // ফর্ম খালি করা
        } catch (err) {
            alert('Error adding food');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Add New Food</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Food Name" className="w-full p-2 border rounded" 
                    onChange={(e) => setFood({...food, name: e.target.value})} />
                <input type="number" placeholder="Price" className="w-full p-2 border rounded" 
                    onChange={(e) => setFood({...food, price: e.target.value})} />
                <input type="text" placeholder="Category" className="w-full p-2 border rounded" 
                    onChange={(e) => setFood({...food, category: e.target.value})} />
                <input type="text" placeholder="Image URL" className="w-full p-2 border rounded" 
                    onChange={(e) => setFood({...food, image: e.target.value})} />
                <button type="submit" className="w-full bg-[#F59E0B] text-white p-2 rounded font-bold">Add Food</button>
            </form>
        </div>
    );
};

export default AddFood;