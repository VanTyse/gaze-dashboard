import { Table, TableProps } from "antd";
import { ConfirmedSignatureInfo } from "@solana/web3.js";
import moment from "moment";
import getDaysAgo from "@/lib/utils/calculateDaysAgo";

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
        <div className="max-w-[300px]">
          <p className="truncate text-cas-primary-teal">{data}</p>
        </div>
      ),
    },
    {
      title: "Block",
      dataIndex: "slot",
      key: "block",
      render: (data) => <span className="font-bold">{data}</span>,
    },
    {
      title: "Age",
      dataIndex: "blockTime",
      key: "type",
      render: (data, record) => (
        <div className="">
          {getDaysAgo(new Date(data * 1000).toString())} days ago
        </div>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "blockTime",
      key: "blockTime",
      render: (data) => <p>{new Date(data * 1000).toUTCString()}</p>,
    },
    {
      title: "Status",
      dataIndex: "confirmationStatus",
      key: "confirm",
      render: (data) => (
        <div className="rounded-md px-2 py-1 text-xs w-fit bg-teal-300 text-teal-800 font-medium capitalize">
          {data}
        </div>
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
