<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"  type="text/less">
  #app {
    max-width: 750px;
    margin: 0 auto;
    min-height: 100%;
    font-size: .16rem;
  }
</style>
