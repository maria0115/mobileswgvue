import axios from "axios";

function Get() {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/form`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function jsonPost(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/editor`,
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {jsonPost,Get}