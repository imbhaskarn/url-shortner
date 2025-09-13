import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calender";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Search, SlidersHorizontal } from 'lucide-react';

const LeadsOverview = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [error, setError] = useState(null);
  const [newLead, setNewLead] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
    status: 'new',
    source: '',
    lead_score: 0,
    deal_value: '',
    expected_close_date: null,
  });

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLeads(data);
        setFilteredLeads(data);
      } catch (error) {
        console.error("There was a problem fetching the leads:", error);
        setError("Failed to fetch leads. Please try again later.");
      }
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    const filtered = leads.filter(lead => 
      (lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       lead.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || lead.status === statusFilter)
    );
    setFilteredLeads(filtered);
  }, [searchTerm, statusFilter, leads]);

  // ... (rest of the functions remain the same)

  return (
    <div className="p-8">
    <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold">Leads Overview</h1>
    <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="First Name"
            value={newLead.first_name}
            onChange={(e) => setNewLead({ ...newLead, first_name: e.target.value })}
          />
          <Input
            placeholder="Last Name"
            value={newLead.last_name}
            onChange={(e) => setNewLead({ ...newLead, last_name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Email"
            value={newLead.email}
            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
          />
          <Input
            placeholder="Phone"
            value={newLead.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
          />
          <Input
            placeholder="Company"
            value={newLead.company}
            onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
          />
          <Input
            placeholder="Job Title"
            value={newLead.job_title}
            onChange={(e) => setNewLead({ ...newLead, job_title: e.target.value })}
          />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        <SelectItem value="new">New</SelectItem>
        <SelectItem value="contacted">Contacted</SelectItem>
        <SelectItem value="qualified">Qualified</SelectItem>
        <SelectItem value="lost">Lost</SelectItem>
        <SelectItem value="converted">Converted</SelectItem>
      </SelectContent>
    </Select>
          <Input
            placeholder="Source"
            value={newLead.source}
            onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Lead Score"
            value={newLead.lead_score}
            onChange={(e) => setNewLead({ ...newLead, lead_score: parseInt(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Deal Value"
            value={newLead.deal_value}
            onChange={(e) => setNewLead({ ...newLead, deal_value: e.target.value })}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {newLead.expected_close_date ? format(newLead.expected_close_date, 'PPP') : 
                 <span>Pick a date <CalendarIcon className="ml-2 h-4 w-4" /></span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={newLead.expected_close_date}
                onSelect={(date) => setNewLead({ ...newLead, expected_close_date: date })}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={handleAddLead}>Add Lead</Button>
      </DialogContent>
    </Dialog>
  </div>
  
      <div className="mb-6 flex space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" /> More Filters
        </Button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer" onClick={() => handleSort('first_name')}>Name</TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>Email</TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('company')}>Company</TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>Status</TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('lead_score')}>Lead Score</TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('deal_value')}>Deal Value</TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort('expected_close_date')}>Expected Close</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredLeads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell>{`${lead.first_name} ${lead.last_name}`}</TableCell>
            <TableCell>{lead.email}</TableCell>
            <TableCell>{lead.company}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
            </TableCell>
            <TableCell>{lead.lead_score}</TableCell>
            <TableCell>${lead.deal_value}</TableCell>
            <TableCell>{lead.expected_close_date ? format(new Date(lead.expected_close_date), 'MMM d, yyyy') : 'N/A'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default LeadsOverview;