import { Table, TableProps } from "antd";
import { ConfirmedSignatureInfo } from "@solana/web3.js";

type Transaction = ConfirmedSignatureInfo;

export default function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
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
      render: (data, record) => <div className="">{}</div>,
    },
    {
      title: "Timestamp",
      dataIndex: "blockTime",
      key: "email",
      render: (data) => <p></p>,
    },
    {
      title: "Status",
      dataIndex: "confirmationStatus",
      key: "confirm",
      render: (data) => (
        <div className="rounded-md px-2 py-1 text-xs">{data}</div>
      ),
    },
  ];
  return (
    <Table
      // loading={isUsersFetching}
      columns={columns}
      dataSource={transactions}
      rowKey={"id"}
    />
  );
}
