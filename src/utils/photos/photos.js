import axios from 'axios';

export default async function downloadPicture(pic) {
    await axios.get(pic.url,
    {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/jpg'
        }
    })
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${pic.name}.jpg`); 
        document.body.appendChild(link);
        link.click();
    })
    .catch((error) => console.log(error));
 }