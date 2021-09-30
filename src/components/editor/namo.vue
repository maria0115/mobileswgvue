<template>
    <iframe src="http://m60.saerom.co.kr/dwp/com/sys/gwlib.nsf/crosseditor_mobile?ReadForm" style="width:100%;height:60vh" ref="namo"></iframe>
</template>

<script>
export default {
    props: ['editor','read'],
    created() {
        this.editorData = this.editor;
    },
    mounted() {
        window.addEventListener( 'message', this.receiveMsgFromChild );
    },
    beforeDestroy() {
        window.removeEventListener( 'message', this.receiveMsgFromChild );
    },
    data: function () {
        return {
            editorData: "",
        };
    },
    methods: {
        receiveMsgFromChild(e){
            if(e.data === "NamoCrossEditor"){
                this.$refs.namo.contentWindow.crosseditor.SetBodyValue(this.editorData);
                if(this.read){
                    this.$refs.namo.contentWindow.crosseditor.SetReadonly(true);
                }
            } 
        },
    }
}
</script>

<style>

</style>