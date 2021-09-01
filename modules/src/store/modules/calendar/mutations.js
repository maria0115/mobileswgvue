
export default {
    ScheduleOrgDataDelete(state, { data, pointer }) {
        state.scheduleorg[pointer] = state.scheduleorg[pointer].filter((element) => element !== data);
    },
    ScheduleOrgDataInit(state) {
        state.scheduleorg = {
            pointer: "SendTo",
            SendTo: [],
            CopyTo: [],
            BlindCopyTo: []
        };
        return;
    },
    // ScheduleOrgTransData(state, data) {
    //     state.mail.data.org.trans = data;
    // },
    ScheduleOrgPointer(state, point) {
        state.scheduleorg.pointer = point;
    },
    ScheduleOrgData(state, data) {
        var scheduleorg = state.scheduleorg[state.scheduleorg.pointer];
        if (data.kinds === "Department") {
            data.id = data.mycode;
            data.shortname = data.name;
        }
        scheduleorg.push(data);

        var result = scheduleorg.filter(function (item1, idx1) {
            return scheduleorg.findIndex(function (item2, idx) {
                if (item1.email) {
                    return item1.email == item2.email;
                } else {
                    return item1.name == item2.name;
                }
            }) == idx1;
        });



        state.scheduleorg[state.scheduleorg.pointer] = result;


    },
    SaveScheduleUnid(state, {unid,where}) {
        state.store.schedule.detail.unid = unid;
        state.store.schedule.detail.where= where;
    },

    SaveScheduleList(state, {data,date}) {
        state.store.schedulelist.date = date;
        state.store.schedulelist.data = data;
        return;
    },
    CalList(state, { data, which,option }) {
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
                // console.log(daysSort[day])
                d[daysSort[day]] = d[daysSort[day]] || [];

                var endtime = data[i].endtime.split(":")[0];
                var starttime = data[i].starttime.split(":")[0];
                var chai = parseInt(endtime) - parseInt(starttime); //
                if (d[daysSort[day]].length === 0) {
                    for (var h = 0; h < 24; h++) {
                        d[daysSort[day]].push([]);
                    }
                }
                for(var j = 0; j <chai; j++) {
                        d[daysSort[day]][parseInt(starttime)+j].push(data[i]);
                }
            }
            data = d;

        }else if(which ==="day"){
            var d = {};
            for (var i = 0; i < data.length; i++) {
                var endtime = data[i].endtime.split(":")[0];
                var starttime = data[i].starttime.split(":")[0];
                var chai = parseInt(endtime) - parseInt(starttime); //
                for (var h = 0; h < 24; h++) {
                    d[h] = d[h] || [];
                }
                for(var j = 0; j <chai; j++) {
                    d[parseInt(starttime)+j].push(data[i]);
                }

            }
            data = d;

        }
        state.schedule.data.calList[which] = data;
    },
    SearchOrgInit(state) {
        state.autosearchorg = {
            mail: {
                SendTo: [],
                CopyTo: [],
                BlindCopyTo: []
            },schedule: {
                SendTo: [],
                CopyTo: [],
                BlindCopyTo: []
            }
        };
    },
    ScheduleAddOrg(state, { who, value, menu }) {
        var scheduleorg = state.scheduleorg[who];
        scheduleorg.push(value);

        var result = scheduleorg.filter(function (item1, idx1) {
            return scheduleorg.findIndex(function (item2, idx) {
                return item1.email == item2.email
            }) == idx1;
        });

        state.scheduleorg[who] = result;

        return;

    },
    AutoSearchOrg(state, { data, menu }) {
        state.autosearchorg[menu.menu][menu.who] = data;
    },
    // 일정 데이터
    Schedule(state, { res, scheduletype, category }) {
        state.main.data.scheduletype[scheduletype][category].data = res;
    },
}