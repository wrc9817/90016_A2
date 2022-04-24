<template>
  <el-row justify="center" :gutter="0" class="comment-body">
    <el-col :span="18">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card shadow="always">
            <div class="header">
              <div class="title">{{ detail.title }}</div>
              <div class="authorInfo">
                <div class="author">{{ detail.author.split("@")[0] }}</div>
                <div class="info">
                  <div class="time">{{ ConvertToUTC(detail.time) }}</div>
                  <div class="views">
                    <span class="iconfont">&#xe60d;</span>
                    <span>{{ detail.views }}</span>
                  </div>
                  <div class="like-count">
                    <el-icon class="icon" :size="14"><star-filled /></el-icon>
                    <span>{{ detail.like_count }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="body">
              <div class="content">{{ detail.content }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card></el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import helperApi from "../utils/helperMethods";
export default {
  computed: {
    detail: function () {
      return this.$store.state.commentDetail;
    },
  },
  methods: {
    ConvertToUTC: helperApi.ConvertUTC,
  },
};
</script>

<style scoped>
.comment-body {
  margin: 10px 0;
}
.title {
  text-align: left;
  font-size: 26px;
  font-weight: bold;
}
.authorInfo {
  padding: 10px 0;
  text-align: left;
}
.author {
  font-size: 16px;
  font-weight: bold;
}
.info {
  font-size: 13px;
  display: flex;
  align-items: center;
}
.time {
  display: inline-block;
  color: grey;
}
.like-count {
  padding: 0 0 0 10px;
  display: inline-flex;
  align-items: center;
}
.content {
  font-size: 16px;
  font-weight: 500;
  text-align: left;
}
.icon {
  color: black;
  padding: 0 3px;
}
.views {
  padding: 0 0 0 10px;
  display: inline-flex;
  align-items: center;
}
.body {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
</style>
