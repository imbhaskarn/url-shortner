import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
} from "../components/ui/table";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import { fetchTransactions } from "../services/api"; // ✅ ensure this exists
import { format } from "date-fns";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch transactions. Please try again later.");
      }
    };
    loadTransactions();
  }, []);

  useEffect(() => {
    const filtered = transactions.filter((tx) => {
      const matchesSearch =
        tx.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.amount?.toString().includes(searchTerm);
      const matchesStatus =
        statusFilter === "all" || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredTransactions(filtered);
  }, [searchTerm, statusFilter, transactions]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    setFilteredTransactions((prev) =>
      [...prev].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      })
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      success: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Transactions
      </h1>

      <div className="mb-6 flex space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search by description or amount..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => handleSort("amount")}>
          Sort by Amount{" "}
          {sortConfig.key === "amount" &&
            (sortConfig.direction === "ascending" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            ))}
        </Button>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <Table className="shadow-lg rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHeadCell>Merchant</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell>Currency</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((tx) => (
            <TableRow
              key={tx._id}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <TableCell>{tx.merchant?.name || "N/A"}</TableCell>
              <TableCell>{tx.transactionType || "N/A"}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                    tx.status
                  )}`}
                >
                  {tx.status || "N/A"}
                </span>
              </TableCell>
              <TableCell>
                {tx.currency || "USD"} {tx.amount ?? 0}
              </TableCell>
              <TableCell>{tx.currency || "N/A"}</TableCell>
              <TableCell>
                {tx.createdAt
                  ? format(new Date(tx.createdAt), "PPpp")
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;
