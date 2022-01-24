import axios from "axios";

function Get() {
    return axios({
        method: 'get',
        url: `/api/form`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function jsonPost(data) {
    return axios({
        method: 'post',
        url: `/api/editor`,
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {jsonPost,Get}