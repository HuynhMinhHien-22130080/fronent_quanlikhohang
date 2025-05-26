import React, { useState } from "react";
import { Package, Plus, Save, X, ClipboardCheck } from "lucide-react";

export default function ProductHeader() {
  const [activeForm, setActiveForm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    transactionCode: "",
    userId: 0,
    employeeName: "",
    carrierId: 0,
    carrierName: "",
    supplierId: 0,
    supplierName: "",
    importDate: new Date().toISOString().split("T")[0],
    totalAmount: 0,
    notes: "",
    details: [],
  });
  const [currentProduct, setCurrentProduct] = useState({
    productId: 0,
    productName: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  // 4.1.1: Click "Tạo phiếu nhập kho"
  const handleCreateImport = () => {
    setActiveForm("import");
    setShowForm(true);
    console.log("4.1.2: Hiển thị form nhập phiếu");
  };

  const handleCreateInventory = () => {
    setActiveForm("inventory");
    setShowForm(true);
    console.log("Hiển thị form kiểm kê");
  };

  const handleSubmit = (formType) => {
    if (formType === "inventory") {
      alert("Lưu phiếu kiểm kê thành công!");
      setShowForm(false);
      setActiveForm("");
    }
  };

  // 4.2.1: Nhập thông tin cơ bản
  const handleFormDataChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log("4.2.2: Validate và hiển thị thông tin đã nhập");
  };

  // 4.3.1: Nhập thông tin sản phẩm
  const handleProductChange = (field, value) => {
    setCurrentProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 4.3.2: Click "Thêm sản phẩm"
  const handleAddProduct = () => {
    if (currentProduct.productId && currentProduct.productName) {
      const updatedDetails = [...formData.details, { ...currentProduct }];
      setFormData((prev) => ({
        ...prev,
        details: updatedDetails,
        totalAmount:
          prev.totalAmount + currentProduct.price * currentProduct.quantity,
      }));

      console.log("4.3.4: Hiển thị danh sách sản phẩm đã thêm", updatedDetails);

      setCurrentProduct({
        productId: 0,
        productName: "",
        price: 0,
        quantity: 0,
        description: "",
      });
    }
  };

  const handleRemoveProduct = (index) => {
    const removedProduct = formData.details[index];
    const updatedDetails = formData.details.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      details: updatedDetails,
      totalAmount:
        prev.totalAmount - removedProduct.price * removedProduct.quantity,
    }));
  };

  // 4.4.1: Click "Lưu phiếu"
  const handleSaveTransaction = async () => {
    try {
      const createDto = {
        transactionCode: formData.transactionCode,
        userId: formData.userId,
        employeeName: formData.employeeName,
        carrierId: formData.carrierId,
        carrierName: formData.carrierName,
        supplierId: formData.supplierId,
        supplierName: formData.supplierName,
        importDate: formData.importDate,
        totalAmount: formData.totalAmount,
        notes: formData.notes,
        details: formData.details,
      };
      console.log("4.4.2: Tạo CreateImportTransactionDTO", createDto);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("4.4.35: Tạo phiếu thành công!");

      setShowForm(false);
      setFormData({
        transactionCode: "",
        userId: 0,
        employeeName: "",
        carrierId: 0,
        carrierName: "",
        supplierId: 0,
        supplierName: "",
        importDate: new Date().toISOString().split("T")[0],
        totalAmount: 0,
        notes: "",
        details: [],
      });
    } catch (error) {
      console.error("4.4.25: Lỗi khi tạo phiếu:", error);
      alert("Lỗi: " + error.message);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setActiveForm("");
  };

  return (
    <div className="bg-gray-50 mb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quản Lý Kho Hàng
              </h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateImport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Tạo phiếu nhập kho
              </button>
              <button
                onClick={handleCreateInventory}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <ClipboardCheck className="w-5 h-5" />
                Kiểm kê
              </button>
            </div>
          </div>
        </div>

        {/* Form với animation */}
        {showForm && (
          <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
            {activeForm === "import" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Tạo phiếu nhập kho mới
                    </h2>
                    <button
                      onClick={handleCloseForm}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  {/* Thông tin cơ bản */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Thông tin cơ bản
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                          Mã phiếu
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập mã phiếu"
                          value={formData.transactionCode}
                          onChange={(e) =>
                            handleFormDataChange(
                              "transactionCode",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                          User ID
                        </label>
                        <input
                          type="number"
                          placeholder="Nhập User ID"
                          value={formData.userId || ""}
                          onChange={(e) =>
                            handleFormDataChange(
                              "userId",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                          Tên nhân viên
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập tên nhân viên"
                          value={formData.employeeName}
                          onChange={(e) =>
                            handleFormDataChange("employeeName", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                          Carrier ID
                        </label>
                        <input
                          type="number"
                          placeholder="Nhập Carrier ID"
                          value={formData.carrierId || ""}
                          onChange={(e) =>
                            handleFormDataChange(
                              "carrierId",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                          Tên nhà vận chuyển
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập tên nhà vận chuyển"
                          value={formData.carrierName}
                          onChange={(e) =>
                            handleFormDataChange("carrierName", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                          Supplier ID
                        </label>
                        <input
                          type="number"
                          placeholder="Nhập Supplier ID"
                          value={formData.supplierId || ""}
                          onChange={(e) =>
                            handleFormDataChange(
                              "supplierId",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                          Tên nhà cung cấp
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập tên nhà cung cấp"
                          value={formData.supplierName}
                          onChange={(e) =>
                            handleFormDataChange("supplierName", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                          Ngày nhập
                        </label>
                        <input
                          type="date"
                          value={formData.importDate}
                          onChange={(e) =>
                            handleFormDataChange("importDate", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2 lg:col-span-3">
                        <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                          Ghi chú
                        </label>
                        <textarea
                          placeholder="Nhập ghi chú (tùy chọn)"
                          value={formData.notes}
                          onChange={(e) =>
                            handleFormDataChange("notes", e.target.value)
                          }
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form thêm sản phẩm */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Thêm sản phẩm
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product ID
                          </label>
                          <input
                            type="number"
                            placeholder="Nhập Product ID"
                            value={currentProduct.productId || ""}
                            onChange={(e) =>
                              handleProductChange(
                                "productId",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên sản phẩm
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            value={currentProduct.productName}
                            onChange={(e) =>
                              handleProductChange("productName", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Giá
                          </label>
                          <input
                            type="number"
                            placeholder="Nhập giá"
                            value={currentProduct.price || ""}
                            onChange={(e) =>
                              handleProductChange(
                                "price",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số lượng
                          </label>
                          <input
                            type="number"
                            placeholder="Nhập số lượng"
                            value={currentProduct.quantity || ""}
                            onChange={(e) =>
                              handleProductChange(
                                "quantity",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mô tả
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập mô tả sản phẩm"
                          value={currentProduct.description}
                          onChange={(e) =>
                            handleProductChange("description", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={handleAddProduct}
                        disabled={
                          !currentProduct.productId ||
                          !currentProduct.productName
                        }
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Thêm sản phẩm
                      </button>
                    </div>
                  </div>

                  {/* Danh sách sản phẩm */}
                  {formData.details.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Danh sách sản phẩm ({formData.details.length})
                      </h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                          <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                            <div>ID</div>
                            <div>Tên sản phẩm</div>
                            <div>Giá</div>
                            <div>Số lượng</div>
                            <div>Thành tiền</div>
                            <div>Thao tác</div>
                          </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {formData.details.map((product, index) => (
                            <div key={index} className="px-4 py-3">
                              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                                <div className="font-medium">
                                  {product.productId}
                                </div>
                                <div>{product.productName}</div>
                                <div>{product.price.toLocaleString()} VNĐ</div>
                                <div>{product.quantity}</div>
                                <div className="font-medium text-green-600">
                                  {(
                                    product.price * product.quantity
                                  ).toLocaleString()}{" "}
                                  VNĐ
                                </div>
                                <div>
                                  <button
                                    onClick={() => handleRemoveProduct(index)}
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">
                              Tổng cộng:
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              {formData.totalAmount.toLocaleString()} VNĐ
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Nút lưu */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleCloseForm}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveTransaction}
                      disabled={
                        formData.details.length === 0 ||
                        !formData.transactionCode
                      }
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Lưu phiếu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form Kiểm Kê */}
            {activeForm === "inventory" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Phiếu Kiểm Kê
                    </h2>
                    <button
                      onClick={handleCloseForm}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                      Mã kiểm kê:
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="VD: KK001"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                      Ngày kiểm kê:
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                      Người kiểm kê:
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Tên người kiểm kê"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                      Khu vực kiểm kê:
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Kho chính</option>
                      <option>Kho phụ</option>
                      <option>Kho hàng trả về</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                      Kết quả kiểm kê:
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="4"
                      placeholder="Mô tả kết quả kiểm kê"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleCloseForm}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleSubmit("inventory")}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Lưu phiếu kiểm kê
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
