<template>
    <iframe :src="src" style="width:100%;height:60vh;overflow:hidden;" ref="namo"></iframe>
</template>

<script>
export default {
    props: ['editor','read','did'],
    created() {
        this.editorData = this.editor;
        this.src = this.src + this.did;
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
            src: "http://dm60.saerom.co.kr/dwp/com/sys/gwlib.nsf/crosseditor_mobile?ReadForm&did=",
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