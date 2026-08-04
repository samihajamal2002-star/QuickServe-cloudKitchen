import { useEffect, useState } from "react";
import axios from "../api/axios";
import EditFoodModal from "../components/admin/EditFoodModal";
import "./admin/Dashboard.css";

const FoodManagement = () => {

    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [selectedFood, setSelectedFood] = useState(null);

    const loadFoods = async () => {

        try {

            const res = await axios.get("/menu");

            setFoods(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadFoods();

    }, []);

    const deleteFood = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this food?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(`/menu/${id}`);

            alert("Food Deleted Successfully");

            loadFoods();

        }

        catch (err) {

            console.log(err);

            alert("Delete Failed");

        }

    };

    const filteredFoods = foods.filter(food => {

        const matchSearch = food.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =

            category === "All"

                ? true

                : food.category === category;

        return matchSearch && matchCategory;

    });

    return (

        <div className="content">

            <h1>🍔 Food Management</h1>

            <div className="menuTop">

                <input

                    type="text"

                    placeholder="Search Food..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

                <select

                    value={category}

                    onChange={(e)=>setCategory(e.target.value)}

                >

                    <option>All</option>
                    <option>Burger</option>
                    <option>Pizza</option>
                    <option>Chicken</option>
                    <option>Drinks</option>
                    <option>Dessert</option>

                </select>

            </div>

            <table className="table">

                <thead>

                    <tr>

                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredFoods.map(food=>(

                            <tr key={food._id}>

                                <td>

                                    <img

                                        src={`http://localhost:5000${food.image}`}

                                        width="70"

                                        height="70"

                                        style={{

                                            objectFit:"cover",

                                            borderRadius:"8px"

                                        }}

                                        alt={food.name}

                                    />

                                </td>

                                <td>{food.name}</td>

                                <td>{food.category}</td>

                                <td>৳ {food.price}</td>

                                <td>{food.stock}</td>

                                <td>

                                    {

                                        food.stock>5 ?

                                        <span
                                            style={{
                                                color:"green",
                                                fontWeight:"bold"
                                            }}
                                        >

                                            Available

                                        </span>

                                        :

                                        food.stock>0 ?

                                        <span
                                            style={{
                                                color:"orange",
                                                fontWeight:"bold"
                                            }}
                                        >

                                            Low Stock

                                        </span>

                                        :

                                        <span
                                            style={{
                                                color:"red",
                                                fontWeight:"bold"
                                            }}
                                        >

                                            Out Of Stock

                                        </span>

                                    }

                                </td>

                                <td>

                                    <button

                                        onClick={()=>setSelectedFood(food)}

                                    >

                                        Edit

                                    </button>

                                    <button

                                        style={{

                                            background:"red"

                                        }}

                                        onClick={()=>deleteFood(food._id)}

                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            {

                selectedFood &&

                <EditFoodModal

                    food={selectedFood}

                    refresh={loadFoods}

                    onClose={()=>setSelectedFood(null)}

                />

            }

        </div>

    );

};

export default FoodManagement;