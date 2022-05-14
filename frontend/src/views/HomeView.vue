<template>
  <el-row justify="center" class="body">
    <el-col :span="18">
      <div class="carousel-pic">
        <el-carousel
          indicator-position="outside"
          :interval="4000"
          type="card"
          height="500px"
        >
          <el-carousel-item v-for="item in videoList" :key="item">
            <img :src="item" class="img" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="video"></div>
      <el-row class="comments" :gutter="40">
        <el-col :span="16" v-if="comments">
          <Comment
            v-for="(item, index) in viewMoreCount"
            :key="index"
            :commentInfo="comments[index]"
          ></Comment>
          <div
            @click="handleToLogin"
            class="view-more clickable"
            v-if="comments.length >= 4 && !isLogin"
          >
            Login To view more
          </div>
          <div
            v-if="comments.length >= 4 && isLogin && showViewMore"
            class="view-more clickable"
            @click="handleViewMore"
          >
            View more
          </div>
        </el-col>
        <el-col :span="8">
          <el-card class="menu-wrapper"> 
          <div class="clickable menu-item" v-for="item,index in characteristic" :key="item" @click="handleEnterFeature(index+1)">{{item}}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src
import Comment from "../components/card/comment.vue";
export default {
  components: {
    Comment,
  },
  data() {
    return {
      viewMoreCount: 1,
      showViewMore: true,
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
      characteristic: [
        "Giant Panda’s habits",
        "Wild distribution of giant pandas",
        "How to feed in the zoo",
        "Reasons of population decline",
        "Giant panda breeding",
        "Solitary or herd preferences",
      ],
    };
  },
  computed: {
    isLogin: function () {
      return localStorage.getItem("isLogin");
    },
    isAdmin:function(){
      return this.$store.state.userInfo.isAdmin==1?true:false
    },
    comments: function () {
      this.viewMoreCount =
        this.$store.state.comments && this.$store.state.comments.length < 4
          ? this.$store.state.comments.length
          : 4;
        return this.$store.state.comments;
    },
  },
  methods: {
    handleViewMore() {
      if (this.viewMoreCount + 5 > this.comments.length) {
        this.viewMoreCount = this.comments.length;
        this.showViewMore = false;
      } else {
        this.viewMoreCount = this.viewMoreCount + 5;
      }
    },
    handleToLogin() {
      this.$router.push("/login");
    },
    handleEnterFeature(index){
      if(this.isLogin){
        this.$router.push('/feature')
        this.$store.commit("handleEnterFeature",index)
      }else{
        this.handleToLogin()
      }
    }
  },
};
</script>
<style scoped>
.body {
  /* background: black; */
  /* padding: 20px 0; */
  padding:20px 0;
}

.menu-wrapper {
  font-size: 16px;
}
.menu-item {
  padding: 20px 10px;
}

.img {
  width: 700;
  height: 500px;
}
.view-more {
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
