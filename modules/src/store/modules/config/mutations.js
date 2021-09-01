
export default {
    // created 일때 환경설정 불러오기
    SettingCreated(state, data) {
        state.store.config = data;

    },
    // display mode
    Color(state, { color }) {        // 
        state.store.systemcolor = color;
    },
    // 환경설정 바꾸기
    Config(state, { menu, value, setting }) {
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
            state.store.config[menu][setting] = value;
        } else {
            state.store.config[menu] = value;
        }




    }

}