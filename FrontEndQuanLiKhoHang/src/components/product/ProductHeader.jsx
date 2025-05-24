import React, { useState } from "react";
import { Package } from "lucide-react";

const ProductHeader = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [products, setProducts] = useState([
    { id: 1, name: "", price: 0, quantity: 0, description: "" },
  ]);

  const handleButtonClick = (formType) => {
    setActiveForm(formType === activeForm ? null : formType);
    if (formType === "import") {
      setProducts([
        { id: 1, name: "", price: 0, quantity: 0, description: "" },
      ]);
    }
  };

  const handleSubmit = (type) => {
    console.log(`Submitting ${type} form data`);
    alert(
      `Đã lưu thành công phiếu ${
        type === "import"
          ? "nhập kho"
          : type === "export"
          ? "xuất kho"
          : "kiểm kê"
      }`
    );
    setActiveForm(null);
  };

  const handleCancel = () => {
    setActiveForm(null);
    setProducts([{ id: 1, name: "", price: 0, quantity: 0, description: "" }]);
  };

  const addProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: "",
      quantity: 0,
      price: 0,
      description: "",
      category: "",
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, field, value) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  const calculateTotal = () => {
    return products.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Package className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Quản Lý Kho Hàng</h1>
      </div>
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded-md transition ${
            activeForm === "import"
              ? "bg-white text-blue-600"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
          onClick={() => handleButtonClick("import")}
        >
          Tạo phiếu nhập kho
        </button>
        <button
          className={`px-4 py-2 rounded-md transition ${
            activeForm === "export"
              ? "bg-white text-blue-600"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
          onClick={() => handleButtonClick("export")}
        >
          Tạo phiếu xuất kho
        </button>
        <button
          className={`px-4 py-2 rounded-md transition ${
            activeForm === "inventory"
              ? "bg-white text-blue-600"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
          onClick={() => handleButtonClick("inventory")}
        >
          Tạo phiếu kiểm kê
        </button>
      </div>

      {/* Form container */}
      <div className="container mx-auto mt-6 px-4">
        {activeForm === "import" && (
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Phiếu Nhập Kho
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Mã phiếu nhập:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="VD: NK001"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Tên nhân viên:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Tên nhân viên nhập kho"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Đơn vị vận chuyển:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Tên đơn vị vận chuyển"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Nhà cung cấp:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Tên nhà cung cấp"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Ngày nhập kho:
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="pt-4">
                <h3 className="font-medium text-lg mb-2">Danh sách sản phẩm</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-3 border">STT</th>
                        <th className="py-2 px-3 border">Tên sản phẩm</th>
                        <th className="py-2 px-3 border">Giá (VNĐ)</th>
                        <th className="py-2 px-3 border">Số lượng</th>
                        <th className="py-2 px-3 border">Mô tả</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={product.id}>
                          <td className="py-2 px-3 border text-center">
                            {index + 1}
                          </td>
                          <td className="py-2 px-3 border">
                            <input
                              type="text"
                              className="w-full p-1 border border-gray-300"
                              value={product.name}
                              onChange={(e) =>
                                updateProduct(
                                  product.id,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="py-2 px-3 border">
                            <input
                              type="number"
                              className="w-full p-1 border border-gray-300"
                              value={product.price}
                              onChange={(e) =>
                                updateProduct(
                                  product.id,
                                  "price",
                                  Number(e.target.value)
                                )
                              }
                            />
                          </td>
                          <td className="py-2 px-3 border">
                            <input
                              type="number"
                              className="w-full p-1 border border-gray-300"
                              value={product.quantity}
                              onChange={(e) =>
                                updateProduct(
                                  product.id,
                                  "quantity",
                                  Number(e.target.value)
                                )
                              }
                            />
                          </td>
                          <td className="py-2 px-3 border">
                            <input
                              type="text"
                              className="w-full p-1 border border-gray-300"
                              value={product.description}
                              onChange={(e) =>
                                updateProduct(
                                  product.id,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-2">
                  <button
                    onClick={addProduct}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
                  >
                    + Thêm sản phẩm
                  </button>
                </div>

                <div className="mt-4 flex justify-end">
                  <p className="text-xl font-bold">
                    Tổng tiền: {calculateTotal().toLocaleString()} VNĐ
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Ghi chú:</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                ></textarea>
              </div>
              <div className="pt-4 flex space-x-2">
                <button
                  onClick={() => handleSubmit("import")}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Lưu phiếu nhập kho
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {activeForm === "export" && (
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Phiếu Xuất Kho
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Mã phiếu xuất:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="VD: XK001"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Ngày xuất kho:
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Người nhận:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Tên người nhận"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Lý do xuất kho:
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Bán hàng</option>
                  <option>Điều chuyển</option>
                  <option>Hàng lỗi</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Ghi chú:</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                ></textarea>
              </div>
              <div className="pt-4 flex space-x-2">
                <button
                  onClick={() => handleSubmit("export")}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                >
                  Lưu phiếu xuất kho
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {activeForm === "inventory" && (
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Phiếu Kiểm Kê
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Mã kiểm kê:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="VD: KK001"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Ngày kiểm kê:
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Người kiểm kê:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Tên người kiểm kê"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Khu vực kiểm kê:
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Kho chính</option>
                  <option>Kho phụ</option>
                  <option>Kho hàng trả về</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Kết quả kiểm kê:
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="Mô tả kết quả kiểm kê"
                ></textarea>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => handleSubmit("inventory")}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Lưu phiếu kiểm kê
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductHeader;
