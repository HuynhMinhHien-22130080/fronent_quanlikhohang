import React from 'react';
import { Package } from 'lucide-react';
import Table from '../shared/Table';
import Badge from '../shared/Badge';
import EmptyState from '../shared/EmptyState';
import { getStockDisplay, formatPrice, formatDate, getWarehouseBadge, getSlotBadge } from './utils/productUtils';

const ProductTable = ({ currentItems, startIdx }) => {
  const columns = [
    {
      header: '#',
      accessor: 'index',
      render: (_, index) => (
        <div className="text-sm font-medium text-gray-900">
          {index + 1}
        </div>
      )
    },
    {
      header: 'Tên Sản Phẩm',
      accessor: 'productName',
      render: (product) => (
        <>
          <div className="text-sm font-semibold text-gray-900">
            {product.productName}
          </div>
          <div className="text-xs text-gray-500">
            {product.description}
          </div>
        </>
      )
    },
    {
      header: 'Giá',
      accessor: 'price',
      render: (product) => formatPrice(product.price)
    },
    {
      header: 'Tồn Kho',
      accessor: 'stock',
      render: (product) => {
        const stockDisplay = getStockDisplay(product.stock);
        return (
          <span className={stockDisplay.className}>
            {stockDisplay.value}
          </span>
        );
      }
    },
    {
      header: 'Kho',
      accessor: 'warehouseId',
      render: (product) => {
        const badge = getWarehouseBadge(product.warehouseId);
        return <Badge {...badge} />;
      }
    },
    {
      header: 'Vị Trí',
      accessor: 'slot',
      render: (product) => {
        const badge = getSlotBadge(product.slot);
        return <Badge {...badge} />;
      }
    },
    {
      header: 'Ngày Nhập',
      accessor: 'timeReceive',
      render: (product) => formatDate(product.timeReceive)
    },
    {
      header: 'Ngày Xuất',
      accessor: 'timeDelivery',
      render: (product) => formatDate(product.timeDelivery)
    }
  ];

  const emptyState = (
    <EmptyState
      icon={Package}
      title="Không tìm thấy sản phẩm"
      description="Hãy thử điều chỉnh tiêu chí tìm kiếm của bạn"
    />
  );

  return (
    <Table
      columns={columns}
      data={currentItems}
      emptyState={emptyState}
      startIdx={startIdx}
    />
  );
};

export default ProductTable; 