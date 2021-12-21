<template>
    <iframe :src="src" style="width:100%;height:472px;overflow:hidden;border:0;" ref="namo"></iframe>
</template>

<script>
import configjson from "../../config/config.json";

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
            src: configjson.namoURL,
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