<template>
  <div class="ac_btns">
        <span class="more_plus"></span>
        <ul>
            <li v-for="(value,name) in menu" :key="name"><a>{{value[Object.keys(value)[0]]}}</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
    menu: Array,
  },

}
</script>

<style>

</style>