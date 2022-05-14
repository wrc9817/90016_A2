<template>
  <el-row justify="center" :gutter="0" class="comment-body">
    <el-col :span="18">
      <el-row>
        <el-col :span="24">
          <el-card shadow="always">
            <div class="header">
              <div class="title">{{ detail.title }}</div>
              <div class="commentInfo">
                <div class="avatar">
                  <el-avatar :src="detail.avatar?detail.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                </div>
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
            </div>
            <div class="body">
              <div class="content">{{ detail.content }}</div>
            </div>
            <div class="reply-wrapper">
              <div class="reply-title">Comment<span class="comment-count">{{replies.length}}</span></div>
              <div class="block">
                <div class="avatar">
                  <el-avatar :src="detail.avatar?detail.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'">></el-avatar>
                </div>
                <div
                  class="reply-block"
                  :class="{
                    'reply-block-unfocused': !isFocus,
                  }"
                >
                  <el-input
                    type="textarea"
                    placeholder="Reply on the comment"
                    :rows="isFocus ? 2 : 1"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    v-model="content"
                  ></el-input>
                  <div class="btn-wrapper">
                    <el-button
                      type="primary"
                      class="reply-btn"
                      round
                      @click="handleReply"
                      :class="{ isFocus: !isFocus }"
                     
                      >Reply</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="replied-wrapper">
              <Reply v-for="item in replies" :key="item" :detail="item"></Reply>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import helperApi from "../utils/helperMethods";
import Reply from '../components/common/reply.vue'
import instance from '../utils/index'
export default {
  components:{
    Reply
  },
  data() {
    return {
      isFocus: false,
        content: "",
    };
  },
  computed: {
    detail: function () {
      return this.$store.state.commentDetail;
    },
    userInfo: function () {
      return this.$store.state.userInfo;
    },
    replies:function(){
      return this.$store.state.replies
    }
  },
  methods: {
    ConvertToUTC: helperApi.ConvertUTC,
    handleFocus() {
      this.isFocus = true;
    },
    handleBlur() {
      this.isFocus = false;
    },
    handleReply(){
      var param = {
        commentId:this.detail.id,
        content:this.content,
        authorId:this.userInfo.id,
        author:this.userInfo.email,
        avatar:this.userInfo.avatar
      }
      instance.post("/reply",{
        data:param
      })
      .then((res)=>{
        if(res.data.status==200){
          this.$store.commit("handleReplies",res.data.data)
        }
      })
    }
  },
};
</script>

<style>
.reply-block .el-textarea__inner {
  padding: 10px !important;
  background: transparent;
  min-height: 40px;
  line-height: 2;
  transition:rows 0.25s linear;
}
</style>
<style scoped>
.comment-body {
  margin: 10px 0;
}
.commentInfo{
  padding:10px 0;
  text-align: left;
  display:flex;
  align-items: center;
}
.title {
  text-align: left;
  font-size: 26px;
  font-weight: bold;
}
.authorInfo {
  display:inline-block;
  padding: 0 10px;
  text-align: left;
}
.avatar{
  display:inline-block;
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
/* comment-reply */
.reply-wrapper {
  padding: 10px 0 20px 0;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.block {
  width:50%;
  display: flex;
  align-items: flex-start;
}
.avatar {
  display: inline-block !important;
  padding: 5px 0px;
}
.reply-title {
  padding: 10px 0;
  font-weight: bold;
  font-size: 16px;
}
.comment-count{
  display:inline-block;
  padding:0 5px;
  font-weight: bold;
}
.reply-block {
  margin:0 10px;
  width: 100%;
  background: whitesmoke;
  border-radius: 5px;
  transition: display 0.25s linear, align-items 0.25s linear;
}
.reply-block-unfocused{
  display: flex;
  align-items: center;
  transition: display 0.25s linear, align-items 0.25s linear;

}

.btn-wrapper {
  background: transparent;
  text-align: right;
  padding: 8px 10px;
}
.reply-btn {
  border: none;
  transition: background 0.25s linear, color 0.25s linear;
}
.isFocus {
  background: lightgrey;
  /* border:lightgrey; */
  color: black;
  transition: background 0.25s linear, color 0.25s linear;
}
</style>
