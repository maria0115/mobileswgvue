import {
    LogDelete,
} from '../../../api/index';
// import router from '../../../router/index';
export default {
    LogDelete({ rootState }, data) {
        rootState.tf = true;
        return LogDelete(data)
            .then(res => {
                rootState.tf = false;
                if(res.status==200){
                    return true;
                }
                return false;
            })
    },



}