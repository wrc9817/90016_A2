<template>
<el-row justify="center">
  <el-col :span="18">
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
    <div class="comments">
      <Comment v-for="item,index in viewMoreCount" :key="index" :commentInfo="comments[index]"></Comment>
      <div @click="handleToLogin" class="view-more clickable" v-if="comments.length>=4 && !isLogin">Login To view more</div>
      <div v-if="comments.length>=4 && isLogin && showViewMore" class="view-more clickable" @click="handleViewMore">View more</div>
    </div>
  
  </el-col>
</el-row>
</template>

<script>
  // @ is an alias to /src
  import Comment from '../components/card/comment.vue'
  export default {
    components: {
      Comment
    },
    data() {
      return {
        viewMoreCount:1,
        showViewMore:true,
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
    },
    computed:{
      isLogin:function(){
        return localStorage.getItem('isLogin')
      },
      comments:function(){
        this.viewMoreCount = this.$store.state.comments.length<4?this.$store.state.comments.length:4
        return this.$store.state.comments
      }
    },
    methods:{
      handleViewMore(){
        if(this.viewMoreCount+5>this.comments.length){
          this.viewMoreCount = this.comments.length
          this.showViewMore = false
        }else{
          this.viewMoreCount = this.viewMoreCount +5
        }
      },
      handleToLogin(){
        this.$router.push('/login')
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
  .view-more{
    padding:20px;
    font-size: 20px;
    font-weight: bold;
  }
</style>