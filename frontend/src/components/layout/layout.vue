<template>
  <el-container class="body">
      <el-header height="80" class="header">
          <Banner></Banner>
      </el-header>
      <el-main class="main">
        <router-view class="scroll"></router-view>
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
    z-index:0;
    position: relative;
    padding:50px 0 0 0;
}
.header{
    position: fixed;
    width:100%;
    z-index:10;
    padding-left: 0 !important;
    padding-right: 0 !important;

}
.body{
    overflow:hidden;
}
.scroll{
    overflow: scroll;
}
</style>