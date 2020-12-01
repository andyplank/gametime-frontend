import axios from 'axios';
import networker from '../networker/networker';

export async function downloadPicture(pic) {
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

export async function getPhotos(team_id){
    const headers = {
        'Content-Type': 'application/json'
    }

    const data = {
        team_id: team_id
    }

    const config = {
        method: 'get',
        url: 'https://gametime-server.hubermjonathan.com:8080/photos',
        headers: headers,
        params: data
    }

    const res = await axios(config);
    return res.data.photos;
}

export async function uploadPhoto(photo){
    const headers = {
        'Content-Type': 'application/json'
    }

    const data = {
        team_id: photo.team_id,
        picture: photo.picture,
        name: photo.name,
        active: photo.active
    }

    const config = {
        method: 'post',
        url: 'https://gametime-server.hubermjonathan.com:8080/photos',
        headers: headers,
        data: data
    }

    const res = await networker(config);

    return res.status === 200;
}

export async function setPhotoVisibility(photo){
    const headers = {
        'Content-Type': 'application/json'
    }

    const data = {
        team_id: photo.team_id,
        file_id: photo.file_id,
        active: photo.active
    }

    const config = {
        method: 'put',
        url: 'https://gametime-server.hubermjonathan.com:8080/photos',
        headers: headers,
        data: data
    }

    const res = await networker(config);
    return res.status === 200;
}