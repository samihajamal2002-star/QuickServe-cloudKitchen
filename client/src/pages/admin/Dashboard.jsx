import {
  FaHamburger,
  FaShoppingBag,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-5xl font-black text-slate-800">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-3">
        Welcome back Admin 👋
      </p>

      {/* Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
          <FaShoppingBag className="text-orange-500 text-4xl" />

          <h3 className="text-gray-500 mt-5">
            Total Orders
          </h3>

          <h2 className="text-4xl font-black mt-2">
            245
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
          <FaUsers className="text-orange-500 text-4xl" />

          <h3 className="text-gray-500 mt-5">
            Customers
          </h3>

          <h2 className="text-4xl font-black mt-2">
            145
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
          <FaHamburger className="text-orange-500 text-4xl" />

          <h3 className="text-gray-500 mt-5">
            Foods
          </h3>

          <h2 className="text-4xl font-black mt-2">
            52
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
          <FaDollarSign className="text-orange-500 text-4xl" />

          <h3 className="text-gray-500 mt-5">
            Revenue
          </h3>

          <h2 className="text-4xl font-black mt-2">
            $18K
          </h2>
        </div>

      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100 mt-12">

        <h2 className="text-3xl font-bold mb-8">
          Recent Orders
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">
              <th className="py-4 text-left">Order ID</th>
              <th>Name</th>
              <th>Total</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            <tr className="border-b">
              <td className="py-5">#FD2026</td>
              <td>John</td>
              <td>$225</td>

              <td>
                <span className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full">
                  Preparing
                </span>
              </td>
            </tr>

            <tr className="border-b">
              <td className="py-5">#FD2025</td>
              <td>David</td>
              <td>$180</td>
              <td>
                <span className="bg-green-100 text-green-600 px-4 py-2 ">
                  Delivered
                </span>
              </td>
            </tr>

            <tr>
              <td className="py-5">#FD2024</td>
              <td>Sarah</td>
              <td>$150</td>

              <td>
                <span className="bg-red-100 text-red-500 px-4 py-2 rounded-full">
                  Cancelled
                </span>
              </td>
            </tr>

          </tbody>

        </table>

      </div>
    </>
  );
}