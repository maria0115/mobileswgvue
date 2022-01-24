<template>
  <div
      style="padding:0.93rem;"
      v-html="body"
    ></div>
</template>

<script>
export default {
    created(){
        console.log(this.body)
    },
    props: ["body"],
    watch:{
        body(newval){
            console.log(newval,"newval");
            this.body = newval;
        },
    }

}
</script>

<style>

</style>