import { useEffect, useState } from "react";
import axios from "../api/axios";
import "./admin/Dashboard.css";

const OrderManagement = () => {

    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {

        try {

            const res = await axios.get("/orders");

            setOrders(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadOrders();

    }, []);

    const updateStatus = async (id, status) => {

        try {

            await axios.put(`/orders/${id}`, {

                status

            });

            loadOrders();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="content">

            <h1>📋 Order Management</h1>

            <table className="table">

                <thead>

                    <tr>

                        <th>Order ID</th>

                        <th>Customer</th>

                        <th>Total</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.map(order=>(

                            <tr key={order._id}>

                                <td>{order._id.slice(-6)}</td>

                                <td>{order.customerName}</td>

                                <td>৳ {order.totalPrice}</td>

                                <td>

                                    <span className={

                                        order.status==="Delivered"

                                        ? "stock-green"

                                        : order.status==="Preparing"

                                        ? "stock-orange"

                                        : "stock-red"

                                    }>

                                        {order.status}

                                    </span>

                                </td>

                                <td>

                                    <select

                                        value={order.status}

                                        onChange={(e)=>

                                            updateStatus(

                                                order._id,

                                                e.target.value

                                            )

                                        }

                                    >

                                        <option>

                                            Pending

                                        </option>

                                        <option>

                                            Preparing

                                        </option>

                                        <option>

                                            Out For Delivery

                                        </option>

                                        <option>

                                            Delivered

                                        </option>

                                        <option>

                                            Cancelled

                                        </option>

                                    </select>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default OrderManagement;