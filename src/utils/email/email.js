import networker from '../networker/networker';

export default async function sendEmail(recipient, subject, body){
    const headers = {
        'Content-Type': 'application/json'
    }

    const data = {
        recipient: recipient,
        subject: subject,
        body: body
    }

    const config = {
        method: 'post',
        url: 'https://gametime-server.hubermjonathan.com:8080/fundraising/email',
        headers: headers,
        data: data
    }

    const res = await networker(config);

    return res.data;
}