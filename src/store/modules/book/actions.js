import {
    reservationList, roomList, BookDetail,BookWrite,deleteBook,MyreservationList
} from '../../../api/index';
// import router from '../../../router/index';
export default {
    MyreservationList({state,commit},date){
        MyreservationList(date)
        .then(res=>{
            if (res.status !== 200) {
                return false;
            } else {
                commit("MyreservationList",res.data);
                return res.data;
            }
        })

    },
    deleteBook({state,},data){
        return deleteBook(data)
        .then(res=>{
            if (res.status !== 200) {
                return false;
            } else {
                return res.data;
            }
        })

    },
    BookWrite({state},{data,type}){
        return BookWrite(data,type)
        .then(res=>{
            if (res.status !== 200) {
                return false;
            } else {
                return res.data;
            }
        })

    },
    BookDetail({ state, commit }, data) {
        return BookDetail(data)
            .then(res => {
                if (res.status !== 200) {
                    return false;
                } else {
                    commit("SaveUnid", data.unid);
                    commit("BookDetail",res.data);
                    return res.data;
                }


            })

    },
    reservationList({ state, commit }, data) {
        return reservationList(data)
            .then((res) => {
                // rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {
                    data.res = res.data;
                    commit("List", data);
                    return res.data;
                }

            })
    },
    roomList({ state, commit }, data) {
        return roomList(data)
            .then((res) => {
                // rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {
                    data.res = res.data;
                    commit("List", data);
                    return res.data;
                }

            })
    },
    async stepList({ state, commit, dispatch }, data) {
        var stepIdx = state.step.findIndex((item, idx) => {
            return item == data.type;

        })
        for (var i = stepIdx; i < state.step.length; i++) {
            var redata = {};
            redata.type = state.step[i];
            redata.category = data.category;
            var result = await dispatch("roomList", redata);
            data.category = result[0].code;

        }
        return data.category;
    },



}