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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Calendar } from '../components/ui/calender';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import {
  Calendar as CalendarIcon,
  Plus,
  Search,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { fetchLeads, addLead } from '../services/api';

const Subscibers = () => {
  const [Subscriber , setSubscriber ] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [newSubscribers , setSubscribers ] = useState({
    
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (lead) => {
    navigate(`/leads/${lead.id}`, { state: { lead } });
  };

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const data = await fetchLeads();
        setTransactions(data);
        setFilteredLeads(data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch Leads. Please try again later.');
      }
    };

    fetchLead();
  }, []);

  useEffect(() => {
    const filtered = leads.filter((lead) =>
      lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || lead.status === statusFilter)
    );
    setFilteredLeads(filtered);
  }, [searchTerm, statusFilter, leads]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    setFilteredLeads(prevLeads => [...prevLeads].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    }));
  };

  const handleAddLead = async () => {
    try {
      const response = await addLead(newLead);
      console.log('lead added:', response);
    } catch (error) {
      console.error('Error on adding lead:', error);
    }

    setLeads(prevLeads => [...prevLeads, { ...newLead, id: Date.now() }]);
    setIsAddLeadOpen(false);
    setNewLead({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
     
      status: 'new',
      
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      proessed: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
     
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-8 ">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
Subscribers     </h1>

      <div className="mb-6 flex space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 py-2 px-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px] py-2 px-4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-lg">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">Processed</SelectItem>
            <SelectItem value="contacted">ompleted</SelectItem>
         </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="text-gray-900 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => setSortConfig({ key: 'lead_score', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
        >
          Sort Lead  {sortConfig.key === 'lead_score' && (
            sortConfig.direction === 'ascending' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <Table className="shadow-lg rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHeadCell>First Name</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Timestamp</TableHeadCell>

          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map((transations) => (
            <TableRow
              key={lead.id}
              onClick={() => handleCardClick(payout)}
              className="hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
            > 
              <TableCell>{transation.first_name}</TableCell>
              <TableCell>{transation.transactionType}</TableCell>
              <TableCell>{transation.status}</TableCell>
              <TableCell>{transation.createdAt}</TableCell>
          
        </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Subscibers;
