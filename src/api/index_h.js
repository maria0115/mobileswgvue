import axios from 'axios';
// http://10.118.1.192:9933/api/approval?type=edit
function LogDelete(data) {
    var query = Object.entries(data).map(e => e.join('=')).join('&');
    return axios({
        method: 'delete',
        url: `http://10.118.1.192:9933/api/loglist?${query}`,
        data:data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function MailRecovery(unid) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=recovery&unid=${unid}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function deleteBook(data) {
    return axios({
        method: 'delete',
        url: `http://10.118.1.192:9933/api/reservation?type=deleteItem`,
        data:data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function BookWrite(data,type) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/reservation?type=${type}`,
        data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
function BookDetail(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/reservation?type=detail&unid=${data.unid}`,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
function reservationList(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/reservation?type=${data.type}&category=${data.category}&date=${data.date}&roomId=${data.roomId}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function MyreservationList(date) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/reservation?type=today&date=${date}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function roomList(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/reservation?type=${data.type}&category=${data.category}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function GetBoardSet({lnbid,type}) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/board?type=getBoardSet&lnbid=${lnbid}&category=${type}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function AppSearch(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/approval?type=${data.type}&size=${data.size}&page=${data.page}&keyword=${data.keyword}&filter=${data.filter}&startDate=${data.startDate}&endDate=${data.endDate}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function AppEdit(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/approval?type=edit`,
        data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
function deleteItem(data) {
    return axios({
        method: 'delete',
        url: `http://10.118.1.192:9933/api/approval?type=deleteItem`,
        data:{unid:data.unid,deleteType:data.deleteType},
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function BoardSearch(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/${data.category}?type=${data.type}&size=${data.size}&page=${data.page}&boardType=${data.boardType}&searchType=${data.searchType}&searchword=${data.searchword}&lnbid=${data.lnbid}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function ListOfCategory(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/${data.category}?type=${data.type}&lnbid=${data.lnbid}&size=${data.size}&page=${data.page}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function CategoryList2(id) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/folderTree?category=${id}`,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
// http://10.118.1.192:9933/api/navigation?category=
function CategoryList(id) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/navigation?category=${id}`,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function AppWrite({data,type}) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/approval?type=${type}`,
        data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
function Authority() {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/login?type=Authority`,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function agreeNreject(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/approval?type=agreeNreject`,
        data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
function Logout(data) {
    return axios({
        method: 'DELETE',
        url: `http://10.118.1.192:9933/api/login?type=logout`,
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function Login(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/login?type=login`,
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function AppDetail(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/approval?type=detail&unid=${data.unid}&approvalType=${data.type}&openurl=${data.openurl}`,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function CalWrite(data,type) {
    // console.log("api",data)
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/schedule?type=${type}`,
        data:data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
function BoardEdit(data) {
    // console.log("api",data)
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/board?type=editItem_${data.path}`,
        data:data.data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
function DeleteBoard(data) {
    return axios({
        method: 'DELETE',
        url: `http://10.118.1.192:9933/api/board?type=delete_item`,
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function Likeit(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/board?type=likeIt`,
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function DeleteReply(data) {
    return axios({
        method: 'delete',
        url: `http://10.118.1.192:9933/api/board?type=delete_reply`,
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function WriteReply(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/board?type=wrtie_reply`,
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function ReplyInfo(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/board?type=replyInfo&boardType=${data.type}&root_unid=${data.rootunid}`,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function BoardDetail(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/board?type=detail&boardType=${data.menu}&unid=${data.unid}&lnbid=${data.lnbid}`,
        headers: {
            "Content-Type": "application/json"
        }
    })
}
function BoardWrite(data) {
    // console.log("api",data)
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/board?type=write_${data.path}`,
        data:data.data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
// 전자결재 양식
// approvaltype이 approving이면 결재중 문서 approve면 결재할 문서
function DocApproval(data) {
    // console.log("api",data)
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/approval?type=${data}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 메일 완전 삭제
function MailRealDelete(data){
    return axios({
        method: 'delete',
        url: `http://10.118.1.192:9933/api/mail?type=select_delete`,
        data:data,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
// 일정 선택삭제

function CalDelete(data) {
    return axios({
        method: 'delete',
        url: `http://10.118.1.192:9933/api/schedule?type=select_delete`,
        data:data,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
// 일정상세보기
function CalDetail(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/schedule?type=detail&unid=${data.unid}`,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
// 일정리스트
function CalList(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/schedule?type=list&today=${data.today}&start=${data.start}&end=${data.end}`,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
// 메일검색
function MailSearch(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=search&size=${data.size}&page=${data.page}&searchType=${data.searchType}&searchfield=${data.searchfield}&searchword=${data.searchword}`,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
// 기본 서명, 인사말
function writeForm() {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=writeForm`,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
// 공휴일
function Holiday(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/schedule?type=${data.menu}&year=${data.year}&month=${data.month}`,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
// 스팸 차단

function SpamSet(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=spamSet`,
        data:data,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
// 조직도검색
function OrgAutoSearch(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=autoSearch&keyword=${data.keyword}`,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
// 메일저장
function MailSave(data,menu) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=${menu}`,
        data:data,
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
}
// 메일쓰기
function MailWrite(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=mailsend`,
        data:data,
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
}
// 내게쓰기
function ToMe() {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=myinfo`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 조직도
function Org(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=orgSearch&companycode=${data.companycode}&departmentcode=${data.mycode}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 초기 조직도
function InitOrg(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=org`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 서명 삭제
function SignGreetDelete(data) {
    return axios({
        method: 'delete',
        url: `http://10.118.1.192:9933/api/mail?type=delete_set&unid=${data}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 인사말 수정
function GreetEdit(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=greetingsEdit`,
        data: JSON.stringify(data), //json
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 서명 수정
function SignEdit(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=signatureEdit`,
        data: JSON.stringify(data), //json
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 메일 디테일
function MailDetail(unid,mailtype) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=detail&unid=${unid}&mailType=${mailtype}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 메일 팔로우업 설정
function FollowupSet(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=followupSet`,
        data: JSON.stringify(data), //json
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 메일 팔로우업 정보
function FollowUpInfo(unid) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=followupInfo&unid=${unid}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 메일 지연발송 GET
function GETMailDelay() {
    return axios({
        method: 'GET',
        url: `http://10.118.1.192:9933/api/mail?type=delay`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 메일 자동저장 GET
function GETMailAutoSave() {
    return axios({
        method: 'GET',
        url: `http://10.118.1.192:9933/api/mail?type=autoSave`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 메일 지연발송 SET
function MailDelay(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=delaySet`,
        data: JSON.stringify(data), //json
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 메일 자동저장 SET
function MailAutoSave(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=autoSaveSet`,
        data: JSON.stringify(data), //json
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 인사말 상세보기
function GreetDetail(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=greetings_detail&unid=${data}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 인사말 작성
function GreetAdd(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=greetingsAdd`,
        data: JSON.stringify(data), //json
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 인사말 설정
function GreetSet(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=greetingsSet&unid=${data.unid}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 인사말 list
function GreetList(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=greetings&size=${data.size}&page=${data.page}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 서명 상세보기
function SignDetail(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=signature_detail&unid=${data}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 서명 작성
function SignAdd(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=signatureAdd`,
        data: JSON.stringify(data), //json
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 서명 설정
function SignSet(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=signatureSet&unid=${data.unid}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 서명 list
function SignList(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=signature&size=${data.size}&page=${data.page}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 사용자 정보
function MyInfo() {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/myinfo`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 읽음표시
function ReadFlag(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=readflag&unid=${data.unid}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 메일이동
function MailMove(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/mail?type=moveFolder`,
        data: JSON.stringify(data), //json
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 메일삭제
function MailDelete(data) {
    return axios({
        method: 'delete',
        url: `http://10.118.1.192:9933/api/mail`,
        params: data, //unid,unid
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// receive 받은 메일 
function Mail(data) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/mail?type=${data.mailtype}&size=${data.size}&page=${data.page}&FolderId=${data.FolderId}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 일정
function Schedule(data) {
    var moment = require("moment");
    data.today = moment().format("YYYY-MM-DD");
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/schedule?type=${data.scheduletype}&today=${data.today}`,
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
        url: `http://10.118.1.192:9933/api/board?type=${data.boardtype}&size=${data.size}&page=${data.page}`,
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
        url: `http://10.118.1.192:9933/api/approval?type=${data.approvaltype}&size=${data.size}&page=${data.page}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 환경설정 검색
function PSearch() {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/config`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 환경설정 update
function PUdate(data) {
    return axios({
        method: 'post',
        url: `http://10.118.1.192:9933/api/config`,
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
        url: `http://10.118.1.192:9933/api/keyword`,
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
        url: `http://10.118.1.192:9933/api/keyword`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 언어
function GetLanguage(app) {
    return axios({
        method: 'get',
        url: `http://10.118.1.192:9933/api/languages?language=ko&key=${app}`,
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
        url: `http://10.118.1.192:9933/api/keyword`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 통합검색 검색어 지우기
function DelKeyword(data) {
    return axios({
        method: 'put',
        url: `http://10.118.1.192:9933/api/keyword`,
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
        url: `http://10.118.1.192:9933/api/form`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function DocView(data) {
    return axios({
        method: 'post',
        url: `/convert2image`,
        data: data,
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
    MailMove,
    ReadFlag,
    SignList,
    SignSet,
    SignAdd,
    SignDetail,
    GreetList,
    GreetSet,
    GreetAdd,
    GreetDetail,
    MailAutoSave,
    MailDelay,
    FollowupSet,
    MailDetail,
    GreetEdit,
    SignEdit,
    GETMailDelay,
    GETMailAutoSave,
    SignGreetDelete,
    InitOrg,
    Org,
    ToMe,
    MailWrite,
    OrgAutoSearch,
    SpamSet,
    Holiday,
    writeForm,
    MailSave,
    MailSearch,
    FollowUpInfo,
    CalDetail,
    CalList,
    CalDelete,
    MailRealDelete,
    DocApproval,
    BoardWrite,
    BoardDetail,
    WriteReply,
    DeleteReply,
    Likeit,
    DeleteBoard,
    BoardEdit,
    CalWrite,
    AppDetail,
    Login,
    agreeNreject,
    Authority,
    AppWrite,
    CategoryList,
    ListOfCategory,
    BoardSearch,
    deleteItem,
    AppEdit,
    AppSearch,
    ReplyInfo,
    CategoryList2,
    DocView,
    Logout,
    GetBoardSet,
    roomList,
    reservationList,
    BookDetail,
    BookWrite,
    deleteBook,
    MailRecovery,
    MyreservationList,
    LogDelete,
}