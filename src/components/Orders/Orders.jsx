/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useSelector } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';

const mockData = [
	{
		order_id: "ABC",
		status: 1,
		buyer_email: 'plank2@purdue.edu',
		buyer_address: '1301 3rd St',
		items: [
			{
				item_id: '1234',
				quantity: 4,
				type: 'Small'
			},
			{
				item_id: '12',
				quantity: 1,
				type: 'Large'
			},
			{
				item_id: '4567',
				quantity: 2,
				type: ''
			}
		]
	},
	{
		order_id: "def",
		status: 1,
		buyer_email: 'li2718@purdue.edu',
		buyer_address: '1225 West State Street',
		items: [
			{
				item_id: '1',
				quantity: 4,
				type: 'Small'
			},
			{
				item_id: '2',
				quantity: 1,
				type: 'Large'
			},
			{
				item_id: '3',
				quantity: 2,
				type: ''
			}
		]
	},

]

const Orders = (props) => {
	function selector(store) {
		return {
			teamId:
				store.teams.length > 0
					? store.teams[store.status.selected_team].id
					: 0,
		};
	}	

	const [orders, setOrders] = useState([]);
	const state = useSelector(selector);

	useEffect(() => {
		const orders = [] // call api to retrieve orders
		setOrders(orders);
	}, []);

	function Row(props) {
		const { row } = props;
		const [open, setOpen] = React.useState(false);

		const handleStatusChange = (event) => {
			// TODO call enpoint to chaqnge order status here
		}
	  
		return (
		  <React.Fragment>
			<TableRow>
			  <TableCell>
				<IconButton style={{outline: "none"}} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
				  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
			  </TableCell>
			  <TableCell component="th" scope="row">
				<FormControl variant="outlined">
					<InputLabel>Status</InputLabel>
						<Select
						label="Status"
						value={1}
						onChange={handleStatusChange}
						>
							<MenuItem value={1}>Pending</MenuItem>
							<MenuItem value={2}>Shipped</MenuItem>
							<MenuItem value={3}>Completed</MenuItem>
						</Select>
				</FormControl>
			  </TableCell>
			  <TableCell align="right">{row.buyer_email}</TableCell>
			  <TableCell align="right">{row.buyer_address}</TableCell>
			</TableRow>
			<TableRow>
			  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
			  <Collapse in={open} timeout="auto" unmountOnExit>
				<Table size="small" aria-label="Items">
					<TableHead>
						<TableRow>
							<TableCell>item_id</TableCell>
							<TableCell align="right">quantity</TableCell>
							<TableCell align="right">type</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{row.items.map((item) => (
							<TableRow key={item.item_id}>
								<TableCell>{item.item_id}</TableCell>
								<TableCell align="right">{item.quantity}</TableCell>
								<TableCell align="right">{item.type.length > 0 ? item.type : "N/A"}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Collapse>
			</TableCell>
			</TableRow>
		  </React.Fragment>
		);
	  }
    
	return (
		<>
			{mockData.map((row) => (
				<div style={{width: "50%", paddingBottom: "3%"}}>
					<TableContainer component={Paper}>
					<Table aria-label="simple table" size="small">
						<TableHead>
						<TableRow>
							<TableCell/>
							<TableCell>Status</TableCell>
							<TableCell align="right">Buyer's&nbsp;Email</TableCell>
							<TableCell align="right">Address</TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
							<Row key={row.order_id} row={row}/>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			))}
		</>
	)   
    
    
}

export default Orders;