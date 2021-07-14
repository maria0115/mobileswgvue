import config from '../config/key.js';

export const dataStore = {
    state: {
        config: config.config,  //사용자가 설정한 환결설정
        systemcolor: config.systemcolor,    // 환경설정에서 display를 system mode로 설정 했다면 os에 설정된 색
        language: {},  //다국어}
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
        signviewdata: {},
        greetviewdata: {},
        mailconfig: {
            autosave: {
                config: {
                    use: true,
                    time: 10,
                    day: 60
                },
                dutytime: [
                    1, 2, 3, 5, 10, 15, 20, 30, 40, 60
                ],
                storageperiod: [
                    'N', 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60
                ]


            },
            delay: {
                config: {
                    use: false,
                    time: 10
                },
                dutytime: [
                    1, 2, 3, 5, 10, 15, 20, 30, 40, 60
                ],
            }
        },
    }
}