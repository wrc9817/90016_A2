<template>
  <el-row justify="center" :gutter="0" class="feature-body">
    <el-col :span="16">
      <el-row>
        <el-col :span="24">
          <!-- <el-carousel
          indicator-position="outside"
          :interval="4000"
          type="card"
          height="300px"
        >
          <el-carousel-item v-for="item in videoList" :key="item">
            <img :src="item" class="img" />
          </el-carousel-item>
        </el-carousel> -->
        </el-col>
        <el-col :span="24">
          <el-card class="main">
          <div class="title">{{featureDetail.title}}</div>
          <div class="content">{{featureDetail.content}}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data(){
    return {
      videoList: [
        require("../assets/img/1.jpg"),
        require("../assets/img/2.jpg"),
        require("../assets/img/3.jpg"),
        require("../assets/img/4.jpg"),
        require("../assets/img/5.jpg"),
        require("../assets/img/6.jpg"),
        require("../assets/img/7.jpg"),
        require("../assets/img/8.jpg"),
      ],
    }
  },
  computed:{
    featureDetail:function(){
      return this.$store.state.featureDetail
    }
  }
}
</script>

<style scoped>
.main{
  padding:0 10px;
  min-height: 400px;
}
.title{
  text-align: left;
  padding:15px 0px;
  font-size: 20px;
  font-weight: bold;
}
.content{
  text-align: left;
  padding:10px 0;
  font-size: 16px;
}
.feature-body{
  padding:20px 0;
}
</style>