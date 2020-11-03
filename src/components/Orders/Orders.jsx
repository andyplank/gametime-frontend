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
import { getOrders, setOrderStatus }  from '../../utils/orders/orders';
import './Orders.scss';

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
		status: 2,
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
			teams: store.teams,
			selected: store.status.selected_team,
		};
	}	

	const [orders, setOrders] = useState([]);
	const state = useSelector(selector);

	useEffect(() => {
		async function fetchOrders() {
			const orders = await getOrders(state.teams[state.selected].team_id);
			setOrders(orders);
		}
		fetchOrders();

	}, []);

	function Row(props) {
		const { row } = props;
		const [open, setOpen] = React.useState(false);
		console.log(row);

		const handleStatusChange = async (transaction_id, status) => {
			await setOrderStatus(transaction_id, status);
			const tempOrders = orders.map((order) => {
				if(order.transaction_id === transaction_id){
					order.status = status;
				}
				return order;
			});
			setOrders(tempOrders);
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
						value={row.status}
						onChange={(event) => handleStatusChange(row.transaction_id, event.target.value)}
						>
							<MenuItem value={0}>Pending</MenuItem>
							<MenuItem value={1}>Shipped</MenuItem>
							<MenuItem value={2}>Completed</MenuItem>
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
							<TableCell>Item Name</TableCell>
							<TableCell align="right">Quantity</TableCell>
							<TableCell align="right">Type</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{row.items.map((item) => (
							<TableRow key={item.item_id}>
								<TableCell>{item.name}</TableCell>
								<TableCell align="right">{item.quantity}</TableCell>
								<TableCell align="right">{item.label && item.label.length > 0 ? item.label : "N/A"}</TableCell>
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
		<div className="fill-vert">
			{orders.length > 0 ? 
				orders.map((row, i) => (
					<div key={i} className="orders-display">
						<TableContainer component={Paper}>
						<Table aria-label="simple table" size="small">
							<TableHead>
							<TableRow>
								<TableCell style={{width:'5%'}}/>
								<TableCell style={{width:'25%'}}>Status</TableCell>
								<TableCell style={{width:'10%'}} align="right">Buyer's&nbsp;Email</TableCell>
								<TableCell style={{width:'25%'}} align="right">Address</TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
								<Row key={row.order_id} row={row}/>
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				))
			:
			<p>No orders currently exist for this team</p>
			}
		</ div>
	)   
    
    
}

export default Orders;