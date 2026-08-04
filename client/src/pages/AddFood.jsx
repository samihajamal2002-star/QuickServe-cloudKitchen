import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";

const AddFood = () => {
const navigate = useNavigate();
    const [food, setFood] = useState({

        name: "",

        category: "",

        description: "",

        price: "",

        stock: "",

        preparationTime: "",

        image: null

    });

    const handleChange = (e) => {

        setFood({

            ...food,

            [e.target.name]: e.target.value

        });

    };

    const handleImage = (e) => {

        setFood({

            ...food,

            image: e.target.files[0]

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", food.name);
            formData.append("category", food.category);
            formData.append("description", food.description);
            formData.append("price", food.price);
            formData.append("stock", food.stock);
            formData.append("preparationTime", food.preparationTime);
            formData.append("image", food.image);

            const token=localStorage.getItem("token");

await axios.post(
"/menu",
formData,
{
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"multipart/form-data"
}
}
);

            alert("Food Added Successfully");

            navigate("/admin/managefood");

        }

        catch (err) {

            console.log(err);

            alert("Failed");

        }

    };

    return (

        <div className="content">

            <h1>🍔 Add New Food</h1>

            <form

                className="menuForm"

                onSubmit={handleSubmit}

            >

                <input

                    type="text"

                    name="name"

                    placeholder="Food Name"

                    onChange={handleChange}

                    required

                />

                <input

                    type="text"

                    name="category"

                    placeholder="Category"

                    onChange={handleChange}

                    required

                />

                <input

                    type="number"

                    name="price"

                    placeholder="Price"

                    onChange={handleChange}

                    required

                />

                <input

                    type="number"

                    name="stock"

                    placeholder="Stock"

                    onChange={handleChange}

                    required

                />

                <input

                    type="number"

                    name="preparationTime"

                    placeholder="Preparation Time (min)"

                    onChange={handleChange}

                />

                <input

                    type="file"

                    onChange={handleImage}

                    accept="image/*"

                    required

                />

                <textarea

                    name="description"

                    placeholder="Food Description"

                    onChange={handleChange}

                ></textarea>

                <button type="submit">

                    Add Food

                </button>

            </form>

        </div>

    );

};

export default AddFood;