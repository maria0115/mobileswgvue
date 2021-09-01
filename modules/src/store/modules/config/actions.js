import {
     PSearch, PUdate,
} from '../../../api/index';
import $, { data } from "jquery";
//system 모드이면 무슨 light 인지 dark 인지 감지
const whatcolor = {
    fetch(color) {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            color = "dark";
        } else {
            color = "light";
        }

        return color;

    }
}
export default {
    // 사용자가 설정한 환경설정을 프로그램 시작할 때 적용
    // 비동기 처리로 dom을 전부 구성하고 나서 css를 적용 
    async setMode({ state, commit }) {
        console.log(state)
        // 배포용
        if (process.env.NODE_ENV !== 'development') {
            //엘라스틱에서 사용자 설정값 가져와라
            await PSearch()
                .then(response => {
                    state.store.config = response.data;
                    commit("SettingCreated", response.data);
                    if (response.data.mode === "system") {
                        state.store.systemcolor = whatcolor.fetch(response.data.mode);
                        commit("Color", { color: state.store.systemcolor })
                    } else {
                        state.store.systemcolor = state.store.config.mode;
                        commit("Color", { color: state.store.systemcolor })
                    }

                });

        }
        // 개발용 
        else {
            if (state.store.config.mode === "system") {
                state.store.systemcolor = whatcolor.fetch(state.store.config.mode);
                commit("Color", { color: state.store.systemcolor })
            } else {
                state.store.systemcolor = state.store.config.mode;
                commit("Color", { color: state.store.systemcolor })
            }
        }
        return state.store.config.display;
    },
    // 환경설정 update
    setConfig({ state, commit }, { menu, value, setting }) {
        // 배포용
        // 
        if (process.env.NODE_ENV !== 'development') {
            // 여기!!!!!! 유저마다 환경설정 엘라스틱에 넣어줘야 한다!!!!!!!!!!!!!!!!!!!!!!
            var query = {};
            var pre = state.store.config[menu];
            if (menu === "etiquette") {
                if (
                    typeof setting == "undefined" ||
                    typeof setting == undefined ||
                    setting == undefined ||
                    setting == null ||
                    setting == ""
                ) {
                    state.store.config[menu].use = value;
                } else {
                    state.store.config[menu][setting] = value;
                }
            } else if (menu === "alarm" || menu === "font" || menu === "main") {

                if (menu == "font" && setting == "size") {

                    if (value == "small") {
                        $("html").addClass("small");
                        $("html").removeClass("normal");
                        $("html").removeClass("large");
                        $("html").removeClass("mar15");
                    } else if (value == "normal") {
                        $("html").addClass("normal");
                        $("html").removeClass("small");
                        $("html").removeClass("large");
                        $("html").removeClass("mar15");
                    } else if (value == "large") {
                        $("html").addClass("large");
                        $("html").removeClass("small");
                        $("html").removeClass("normal");
                        $("html").addClass("mar15");
                    }
                }

                state.store.config[menu][setting] = value;
            } else if (menu === "mode") {
                if (value === "system") {
                    state.store.systemcolor = whatcolor.fetch();
                    commit("Color", { color: state.store.systemcolor })
                } else {
                    state.store.systemcolor = value;
                    commit("Color", { color: state.store.systemcolor })
                }
                state.store.config[menu] = value;
            } else {
                state.store.config[menu] = value;
            }
            query.setting = {};
            query.setting[menu] = state.store.config[menu];

            commit("Config", { menu, value, setting })
            PUdate(query)
                .then(response => {
                    if (response.status == 200) {

                    }
                });
        }//개발용
        else {
            commit("Config", { menu, value, setting })
        }
    },

}