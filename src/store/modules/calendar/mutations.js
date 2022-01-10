
export default {
    calListOpen(state, value) {
        state.calListOpen = value;
    },
    isEdit(state, value) {
        state.store.edit = value;
    },
    SaveScheduleUnid(state, { unid, where }) {
        state.store.schedule.detail.unid = unid;
        state.store.schedule.detail.where = where;
    },
    SaveScheduleWhere(state, where) {
        state.store.schedule.detail.where = where;
    },

    SaveScheduleList(state, { data, date }) {
        state.store.schedulelist.date = date;
        state.store.schedulelist.data = data;
        return;
    },
    delCalList(state, { which }) {
        state.schedule.data.calList[which] = [];
    },
    CalList(state, { data, which, option }) {

        if (which === "week") {
            var result = [], d = {}, c = {};
            var daysSort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            for (var i = 0; i < data.length; i++) {
                var start = data[i].startdate;

                var year = start.split("-")[0];
                var month = start.split("-")[1];
                var date = start.split("-")[2];
                var day = new Date(year, month - 1, date).getDay();
                // 
                d[daysSort[day]] = d[daysSort[day]] || {};
                if (data[i].allDay) {
                    d[daysSort[day]].allday = d[daysSort[day]].allday || [];
                    d[daysSort[day]].allday.push(data[i]);

                } else {
                    d[daysSort[day]].timeday = d[daysSort[day]].timeday || [];
                    d[daysSort[day]].timeday.push(data[i]);
                }
            }
            data = d;

        } else if (which === "day") {
            var d = [];
            var timeAllObj = [];
            data.forEach((time, i) => {
                var starttime = time.startdate.split('-').join("") + time.starttime.split(':').join("");
                var endtime = time.enddate.split('-').join("") + time.endtime.split(':').join("");
                let st1 = parseInt(starttime);
                let et1 = parseInt(endtime);
                // 
                var rank = 0;
                if (!time.allDay && option.today == time.enddate) {
                    // if (!time.allDay && isadd.indexOf(i) == -1 && option.today == time.enddate) {
                    var time2arr = [];
                    // d.push(time);
                    data.forEach((time2, j) => {
                        if (!time2.allDay) {
                            var starttime2 = time2.startdate.split('-').join("") + time2.starttime.split(':').join("");
                            var endtime2 = time2.enddate.split('-').join("") + time2.endtime.split(':').join("");
                            let st2 = parseInt(starttime2);
                            let et2 = parseInt(endtime2);
                            if (st1 >= st2 && st1 <= et2 || et1 >= st2 && et1 <= et2 || st2 >= st1 && st2 <= et1 || et2 >= st1 && et2 <= et1) {
                                time2.left = rank;
                                rank++;
                            } 
                        }
                    })
                    time.width = rank;
                    d.push(time);
                }
                if (time.allDay) {
                    timeAllObj.push(time);
                }
            });
            data = {};
            data.data = d;
            data.allday = timeAllObj;
        }

        state.schedule.data.calList[which] = data;
    },
    CalDetail(state, { data, which }) {
        state.schedule.data.calDetail[which] = data;
        return;
    },
}