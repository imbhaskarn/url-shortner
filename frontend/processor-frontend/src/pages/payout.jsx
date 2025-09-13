import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
} from '../components/ui/table';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { fetchPayouts } from '../services/api';  // ✅ now using payouts API

const PayoutsOverview = () => {
  const [payouts, setPayouts] = useState([]);
  const [filteredPayouts, setFilteredPayouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPayouts();
        setPayouts(data);
        setFilteredPayouts(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch payouts. Please try again later.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = payouts.filter((p) =>
      (p.merchant?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.status || '').toLowerCase().includes(searchTerm.toLowerCase())
    ).filter((p) =>
      statusFilter === 'all' || p.status === statusFilter
    );
    setFilteredPayouts(filtered);
  }, [searchTerm, statusFilter, payouts]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    setFilteredPayouts(prev =>
      [...prev].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      })
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      processed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Payouts
      </h1>

      <div className="mb-6 flex space-x-4">
        {/* Search bar */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 py-2 px-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            placeholder="Search payouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="processed">Processed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Button
          variant="outline"
          onClick={() =>
            handleSort('amount')
          }
        >
          Sort by Amount {sortConfig.key === 'amount' &&
            (sortConfig.direction === 'ascending'
              ? <ChevronUp className="ml-2 h-4 w-4" />
              : <ChevronDown className="ml-2 h-4 w-4" />)}
        </Button>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <Table className="shadow-lg rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHeadCell>Merchant</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell>Currency</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayouts.map((p) => (
            <TableRow key={p._id} className="hover:bg-gray-100 cursor-pointer">
              <TableCell>{p.merchant?.name || 'N/A'}</TableCell>
              <TableCell>${p.amount}</TableCell>
              <TableCell>{p.currency}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(p.status)}>
                  {p.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PayoutsOverview;
