export const dataStore = {
    state: {
        signviewdata: {},
        greetviewdata: {},
        mailCustomFolderTitle: "",
        maildetail: {
            unid: ""
        },
        mailconfig: {
            beforesave:false,
            view: {
                signDetailUnid:"",
                greetDetailUnid:"",
            },
            searchOption: {
                size: "14",
                page: "0",
                searchType: "inbox_detail",
                searchfield: "",
                searchword: ""
            },
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
                    5, 10, 15, 20, 25, 30, 45, 60
                ],
            }
        },
    }
}