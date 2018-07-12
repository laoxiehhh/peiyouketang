<template>
  <div class="home">
    <nav-head></nav-head>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navHead from './header'
export default {
  data() {
      return {
        
      }
  },
  components: {
    navHead
  }
}
</script>

<style scoped>
.home {
  width: 100%;
}
</style>

