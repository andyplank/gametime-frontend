import networker from '../networker/networker';

const url = 'http://54.235.234.147:8080';
const headers = {
    'Content-Type': 'application/json'
}


export async function fetchItems(setItems, id) {

    const temp = [];
    for(let i=0; i<3; i+=1){
        const item = {
            item_id: i,
            name: 'T-Shirt',
            types: ['Small', 'Medium', 'etc'],
            picture: 'https://images.asos-media.com/products/asos-design-plus-satin-regular-shirt-in-animal-rock-print/20718856-1-brown?$n_320w$&wid=317&fit=constrain',
            price: 12.00,
        }
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
            setItems(res.data);
        } else {
            return false;
        }
    } catch (err) {
        // TODO: Change to false
        return true;
    }
    return true;

}


export async function purchaseItems(buyer_info, items) {
    const data = { 
        ...buyer_info, 
        items: items
    }
    // const config = {
    //     method: 'post',
    //     url: `${url}/store/order`,
    //     headers: headers,
    //     data: data
    // }
    console.log(data);
    return true;
    // TODO: Link API
    // return networker(config);
}
