import { mapState, mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["GetAppL", "GetMConfigL", "GetBoardL", "GetBookL", "GetScheduleL","GetCommonL"]),

    },
}