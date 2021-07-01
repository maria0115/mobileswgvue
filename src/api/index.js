import axios from 'axios';


// 사용자 정보
function MyInfo() {
    return axios({
        method: 'get',
        url: `/api/myinfo`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 메일삭제
function MailDelete(data) {
    // console.log(data,"data")
    return axios({
        method: 'delete',
        url: `/api/mail`,
        params:data, //unid,unid
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// receive 받은 메일 
function Mail(data) {
    return axios({
        method: 'get',
        url: `/api/mail?type=${data.mailtype}&size=${data.size}&page=${data.page}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function Schedule(data) {
    var moment = require("moment");
    data.today = moment().format("YYYY-MM-DD");
    return axios({
        method: 'get',
        url: `/api/schedule?type=${data.scheduletype}&today=${data.today}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 보드 데이터
// boardtype이 notice이면 공지 recent면 최근게시판
function Board(data) {
    return axios({
        method: 'get',
        url: `/api/board?type=${data.boardtype}&size=${data.size}&page=${data.page}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 전자결재 데이터
// approvaltype이 approving이면 결재중 문서 approve면 결재할 문서
function Approval(data) {
    // console.log("api",data)
    return axios({
        method: 'get',
        url: `/api/approval?type=${data.approvaltype}&size=${data.size}&page=${data.page}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 환경설정 검색
function PSearch() {
    return axios({
        method: 'get',
        url: `/api/config`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 환경설정 update
function PUdate(data) {
    console.log(data)
    return axios({
        method: 'post',
        url: `/api/config`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 자동완성
function Auto(data) {
    return axios({
        method: 'post',
        url: `/api/keyword`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 최근검색
function Recent() {
    return axios({
        method: 'get',
        url: `/api/keyword`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 언어
function GetLanguage(app) {
    return axios({
        method: 'get',
        url: `/api/languages?language=ko&key=${app}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 검색
function Search(data) {
    return axios({
        method: 'post',
        url: `/search/search`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 통합검색 검색어 전체지우기
function AllDelKeyword() {
    return axios({
        method: 'delete',
        url: `/api/keyword`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 통합검색 검색어 지우기
function DelKeyword(data) {
    return axios({
        method: 'put',
        url: `/api/keyword`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


// config, form 가져오기
function getForm() {
    return axios({
        method: 'get',
        url: `/api/form`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export {
    PSearch,
    PUdate,
    GetLanguage,
    Search,
    Auto,
    Recent,
    AllDelKeyword,
    DelKeyword,
    getForm,
    Board,
    Approval,
    Schedule,
    Mail,
    MyInfo,
    MailDelete,
}