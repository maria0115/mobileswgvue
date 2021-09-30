<template>
  <div>
    <router-view :key="$route.fullPath"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>