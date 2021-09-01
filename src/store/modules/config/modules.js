import config from '../../../config/config.json';
export const dataStore = {
    state: {
        config: config.config,  //사용자가 설정한 환결설정
        systemcolor: config.systemcolor,    // 환경설정에서 display를 system mode로 설정 했다면 os에 설정된 색
    }
}