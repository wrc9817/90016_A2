<template>
  <div class="body">
    <el-row class="menu-wrapper" :gutter="20">
      <el-col v-for="item,index in characteristic" :span="4" :key="index">
        <span class="menu-item clickable">{{item}}</span>
      </el-col>

    </el-row>
    <div class="carousel-pic">
      <el-carousel indicator-position="outside" :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="item in videoList" :key="item">
          <img :src="item" class="img" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="video">
      
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    components: {

    },
    data() {
      return {
        videoList: [require('../assets/img/animal.jpg'), require('../assets/img/animal2.jpg'), require(
          '../assets/img/animal3.jpg')],
          characteristic:[
            "feature1",
            "feature2",
            "feature3",
            "feature4",
            "feature5",
            "feature6"
          ]
      }
    }
  }
</script>
<style scoped>
  .body {
    /* background: black; */
    /* padding: 20px 0; */
    padding:0 200px;
  }

  .menu-wrapper {
    padding: 30px 0;
    background: whitesmoke;
    margin:10px 0;
    font-size: 16px;
  }
  .menu-item{
    padding:10px;
  }

  .img {
    width: 700;
    height: 500px;
  }
</style>