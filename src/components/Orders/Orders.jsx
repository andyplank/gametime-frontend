/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
    
	return (
		<>
			<p>
				List of Orders - will have a dropdown next to each one representing order status
			</p>
		</>
	)   
    
    
}

export default Orders;