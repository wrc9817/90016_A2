<template>
  <el-row justify="center" class="body">
    <el-col :span="18">
      <el-row :gutter="40">
        <el-col :span="24" class="carousel-pic">
          <div class="video-wrapper" v-loading="loading">
            <iframe
              ref="iframe"
              width="1080"
              height="450"
              src="https://www.youtube.com/embed/PTa357_PGUw"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <!-- <el-carousel
          indicator-position="outside"
          :interval="4000"
          type="card"
          height="500px"
        >
          <el-carousel-item v-for="item in videoList" :key="item">
            <img :src="item" class="img" />
          </el-carousel-item>
        </el-carousel> -->
        </el-col>
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
            <div class="title">Characteristic</div>
            <div
              class="clickable menu-item"
              v-for="(item, index) in characteristic"
              :key="item"
              @click="handleEnterFeature(index + 1)"
            >
              {{ item }}
            </div>
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
  mounted() {
    this.handleIframeLoading();
  },
  data() {
    return {
      viewMoreCount: 1,
      showViewMore: true,
      loading: false,
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
    isAdmin: function () {
      return this.$store.state.userInfo.isAdmin == 1 ? true : false;
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
    handleIframeLoading() {
      this.loading = true;
      const iframe = this.$refs.iframe;
      if (iframe.attachEvent) {
        iframe.attachEvent("onload", () => {
          this.loading = false;
        });
      } else {
        iframe.onload = () => {
          this.loading = false;
        };
      }
    },
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
    handleEnterFeature(index) {
      if (this.isLogin) {
        this.$router.push("/feature");
        this.$store.commit("handleEnterFeature", index);
      } else {
        this.handleToLogin();
      }
    },
  },
};
</script>
<style scoped>
.body {
  /* background: black; */
  /* padding: 20px 0; */
  padding: 20px 0;
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
.title {
  padding: 10px 0 20px 0;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid grey;
}
.video-wrapper {
  padding: 0 0 10px 0;
}
</style>
