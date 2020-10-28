import networker from '../networker/networker';

const url = 'http://54.235.234.147:8080';
const headers = {
    'Content-Type': 'application/json'
}


export async function fetchItems(setItems, id) {
    const item = {
        item_id: '1234',
        name: 'T-Shirt',
        types: ['Small', 'Medium', 'etc'],
        picture: 'URL',
        price: 12.00,
    }
    const temp = [];
    for(let i=0; i<3; i+=1){
        temp.push(item);
    }
    setItems(temp);
    const config = {
        method: 'get',
        url: `${url}/store/items/teamid?=${id}`,
        headers: headers
    }
    try {
        const res = await networker(config);
        if(res.status===200){
            setItems(res.data.users);
        } else {
            return false;
        }
    } catch (err) {
        // TODO: Change to false
        return true;
    }
    return true;

}


export async function purchaseItems(email, address, items) {
    const data = {
        buyer_email: email,
        buyer_address: address,
        items: items
    }
    const config = {
        method: 'post',
        url: `${url}/store/order`,
        headers: headers,
        data: data
    }
    return networker(config);
}
