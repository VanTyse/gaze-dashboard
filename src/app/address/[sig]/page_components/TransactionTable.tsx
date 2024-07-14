import { Table, TableProps } from "antd";

interface Transaction {
  signature: string;
  block: number;
  blockTime: number;
  confirmationStatus: true;
}

export default function TransactionTable() {
  const columns: TableProps<Transaction>["columns"] = [
    {
      title: "Transaction Signature",
      dataIndex: "signature",
      key: "signature",
      render: (data) => (
        <p className="rounded-full bg-gray-300 h-10 w-10 grid place-items-center font-semibold">
          {data}
        </p>
      ),
    },
    {
      title: "Block",
      dataIndex: "block",
      key: "block",
      render: (data) => <span className="font-bold">{data}</span>,
    },
    {
      title: "Age",
      dataIndex: "blockTime",
      key: "type",
      render: (data, record) => (
        <div className="">
          {}
        </div>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "blockTime",
      key: "email",
      render: (data) => <p></p>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (result) =>
        record?.phone ? (
          <a
            target="_blank"
            href={`tel:${record.phone}`}
            className="text-gray-500 font-normal"
          >
            {record.phone}
          </a>
        ) : (
          <span className="text-gray-500 font-normal">
            {record?.phone ?? "Nil"}
          </span>
        ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          onClick={() => handleDrawerOpen(record)}
          className="cursor-pointer"
        >
          <p className="text-blue-600 font-medium">View</p>
        </Space>
      ),
    },
  ];
  return (
    <Table
      // loading={isUsersFetching}
      columns={columns}
      dataSource={users}
      rowKey={"id"}
      // pagination={{
      //   current: filters.page ?? 1,
      //   total: meta?.total ?? users.length ?? 0,
      //   pageSize: filters.per_page,
      //   onShowSizeChange,
      //   onChange: onPageChange,
      // }}
    />
  );
}
