import {
  FaMotorcycle,
  FaShippingFast,
  FaCheckCircle,
} from "react-icons/fa";

export default function RiderDashboard() {
  return (
    <section className="min-h-screen bg-[#FFF7ED] p-8">
      <h1 className="text-4xl font-black text-slate-800 mb-10">
        Rider Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <FaShippingFast className="text-4xl text-orange-500 mb-4" />
          <h3>Assigned Orders</h3>
          <h2 className="text-4xl font-bold">12</h2>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <FaMotorcycle className="text-4xl text-orange-500 mb-4" />
          <h3>On The Way</h3>
          <h2 className="text-4xl font-bold">5</h2>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <FaCheckCircle className="text-4xl text-orange-500 mb-4" />
          <h3>Delivered</h3>
          <h2 className="text-4xl font-bold">41</h2>
        </div>
      </div>
    </section>
  );
}