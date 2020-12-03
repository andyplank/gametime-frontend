import axios from 'axios';
import networker from '../networker/networker';

export async function getPhotos(team_id){
    const headers = {
        'Content-Type': 'application/json'
    }

    const data = {
        team_id: team_id
    }

    const config = {
        method: 'get',
        url: 'https://gametime-server.hubermjonathan.com:8080/photos/all',
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