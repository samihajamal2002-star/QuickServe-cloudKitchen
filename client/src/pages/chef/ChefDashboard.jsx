import {
  FaUtensils,
  FaClipboardList,
  FaFire,
  FaCheckCircle,
} from "react-icons/fa";

export default function ChefDashboard() {
  return (
    <section className="min-h-screen bg-[#FFF7ED] p-8">

      <h1 className="text-4xl font-black text-slate-800 mb-10">
        Chef Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
          <FaClipboardList className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-gray-500">Pending Orders</h3>
          <h2 className="text-4xl font-black mt-2">18</h2>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
          <FaFire className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-gray-500">Preparing</h3>
          <h2 className="text-4xl font-black mt-2">7</h2>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
          <FaCheckCircle className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-gray-500">Ready</h3>
          <h2 className="text-4xl font-black mt-2">12</h2>
        </div>

      </div>

      {/* Orders Table */}

      <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Kitchen Orders
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Order ID</th>
              <th className="text-left">Food</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b">
              <td className="py-4">#FD2026</td>
              <td>Classic Burger</td>
              <td>2</td>
              <td>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  Preparing
                </span>
              </td>
            </tr>

            <tr className="border-b">
              <td className="py-4">#FD2027</td>
              <td>Chicken Pizza</td>
              <td>1</td>
              <td>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                  Ready
                </span>
              </td>
            </tr>

            <tr>
              <td className="py-4">#FD2028</td>
              <td>French Fries</td>
              <td>3</td>
              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Completed
                </span>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </section>
  );
}