<template>
  <el-container>
      <el-header height="80" class="header">
          <Banner></Banner>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
  </el-container>
</template>

<script>
import Banner from '../common/banner.vue'
export default {
components:{
    Banner
}
}
</script>

<style scoped>

.main{
    padding:0;
}
.header{
    padding-left: 0 !important;
        padding-right: 0 !important;

}
</style>