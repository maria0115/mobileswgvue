
export default {
    isEdit(state, value) {
        state.store.edit = value;
    },
    SaveScheduleUnid(state, { unid, where }) {
        state.store.schedule.detail.unid = unid;
        state.store.schedule.detail.where = where;
    },

    SaveScheduleList(state, { data, date }) {
        
        state.store.schedulelist.date = date;
        state.store.schedulelist.data = data;
        return;
    },
    CalList(state, { data, which, option }) {
        if (which === "week") {
            var result = [], d = {}, c = {};
            var daysSort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            let range_s = Math.floor(+new Date(option.start) / 1000);
            let range_e = Math.floor(+new Date(option.end) / 1000);
            
            for (var i = 0; i < data.length; i++) {
                var start = data[i].startdate;
                let current = Math.floor(+new Date(start) / 1000);

                var year = start.split("-")[0];
                var month = start.split("-")[1];
                var date = start.split("-")[2];
                var day = new Date(year, month - 1, date).getDay();
                // 
                d[daysSort[day]] = d[daysSort[day]] || {};
                if(data[i].allDay){
                    d[daysSort[day]].allday = d[daysSort[day]].allday || [];
                    d[daysSort[day]].allday.push(data[i]);

                }else{
                    d[daysSort[day]].timeday = d[daysSort[day]].timeday || [];
                    d[daysSort[day]].timeday.push(data[i]);
                }

                

                // var endtime = data[i].endtime.split(":")[0];
                // var starttime = data[i].starttime.split(":")[0];
                // var chai = parseInt(endtime) - parseInt(starttime); //
                // if (d[daysSort[day]].length === 0) {
                //     for (var h = 0; h < 24; h++) {
                //         d[daysSort[day]].push([]);
                //     }
                // }
                // for (var j = 0; j < chai; j++) {
                //     d[daysSort[day]][parseInt(starttime) + j].push(data[i]);
                // }
            }
            data = d;

        } else if (which === "day") {
            var d = [];
            for (var i = 0; i < data.length; i++) {
                // var endtime = data[i].endtime.split(":")[0];
                // var starttime = data[i].starttime.split(":")[0];
                d.push(data[i]);
                // var chai = parseInt(endtime) - parseInt(starttime); //
                // for (var h = 0; h < 24; h++) {
                //     d[h] = d[h] || [];
                // }
                // for (var j = 0; j < chai; j++) {
                //     d[parseInt(starttime) + j].push(data[i]);
                // }

            }
            data = d;

        }
        
        state.schedule.data.calList[which] = data;
    },
    CalDetail(state, { data, which }) {
        state.schedule.data.calDetail[which] = data;
        return;
    },
}