import config from '../config/key.js';

export const dataStore = {
    state: {
        config: config.config,  //사용자가 설정한 환결설정
        systemcolor: config.systemcolor,    // 환경설정에서 display를 system mode로 설정 했다면 os에 설정된 색
        language: config.language,  //다국어}
        myinfo: {
            info: {
                dept: "",
                name: "",
                position: "",
                photo: ""
            },
            approvalCount: 0,
            mailCount: 0,
            scheduleCount: 0
        },
        // language: {
        //     description: "",
        //     config: {
        //         login: {
        //             setlogin: "",
        //             autologin: ""
        //         },
        //         allim: {
        //             setallim: "",
        //             menuallim: "",
        //             ettitime: "",
        //             starttime: "",
        //             endtime: "",
        //             menu: {
        //                 today: "",
        //                 mail: "",
        //                 approval: "",
        //                 works: "",
        //                 board: ""
        //             }
        //         },
        //         synch: "",
        //         display: {
        //             setdisplay: "",
        //             maindisplay: "",
        //             main: {
        //                 menu: "",
        //                 portal: ""
        //             },
        //             list: [
        //                 10,
        //                 15,
        //                 20
        //             ],
        //             listcount: "",
        //             portlet: ""
        //         },
        //         style: {
        //             setstyle: "",
        //             setsizefont: "",
        //             setsize: "",
        //             setfont: "",
        //             setdark: "",
        //             font: {
        //                 NanumGothic: "",
        //                 NanumMyeongjo: "",
        //                 NotoSans: "",
        //                 Poppins: ""
        //             },
        //             size: {
        //                 small: "",
        //                 normal: "",
        //                 large: ""
        //             },
        //             dark: {
        //                 system: "",
        //                 light: "",
        //                 dark: ""
        //             }
        //         }
        //     },
        //     search: {
        //         inputbox: "",
        //         delete: "",
        //         completion: "",
        //         menu: {
        //             allsearch: "",
        //             approval: "",
        //             board: "",
        //             person: "",
        //             mail: ""
        //         },
        //         person: {
        //             dept: "",
        //             position: "",
        //             tel: "",
        //             phone: "",
        //             email: "",
        //             work: ""
        //         },
        //         more: "",
        //         filter: {
        //             all: "",
        //             day: "",
        //             week: "",
        //             month_1: "",
        //             month_6: "",
        //             select: ""
        //         }
        //     },
        //     main: {
        //         header: {
        //             inputbox: "",
        //             my: "",
        //             mail: "",
        //             approval: "",
        //             schedule: "",
        //             board: "",
        //             reservation: "",
        //             person: ""
        //         },
        //         myinfo: {
        //             mail: "",
        //             approval: "",
        //             schedule: ""
        //         },
        //         portlet: {
        //             mail: "",
        //             announcement: "",
        //             notice: "",
        //             approval: {
        //                 approving: "",
        //                 approve: "",
        //                 draft: "",
        //                 agrement: "",
        //                 approval: ""
        //             },
        //             schedule: "",
        //             portletposition: {
        //                 approving: "",
        //                 mail: "",
        //                 notice: "",
        //                 recentboard: "",
        //                 schedule: ""
        //             },
        //             board: {
        //                 board: "",
        //                 education: "",
        //                 work: ""
        //             },
        //             receive: "",
        //             send: ""
        //         },
        //         footer: {
        //             ktop_home: "",
        //             saerom_home: "",
        //             talk_install: "",
        //             logout: ""
        //         },
        //         hamburger: {
        //             menu: {
        //                 menuset: "",
        //                 portlet: "",
        //                 portletposition: "",
        //                 add: ""
        //             },
        //             button: {
        //                 edit: "",
        //                 reset: "",
        //                 success: ""
        //             }
        //         }
        //     }
        // }
        
        
    }


// export default {
//     // strict: process.env.NODE_ENV !== 'production',
//     state
}