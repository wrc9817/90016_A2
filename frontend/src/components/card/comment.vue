<template>
  <el-card class="box-card">
    <el-checkbox
      v-if="isAdmin"
      v-model="commentInfo.enabled"
      :true-label="1"
      :false-label="0"
      class="enabled"
      border
      @change="handleEnabled"
    ></el-checkbox>
    <div class="header">
      <div class="title clickable" @click="handleOpenDetail">
        {{ commentInfo.title }}
      </div>
      <div class="time">{{ convertUTC(commentInfo.time) }}</div>
    </div>
    <div class="content">
      {{ commentInfo.content }}
    </div>
    <div class="btn-wrapper">
      <div class="author">{{ commentInfo.author.split("@")[0] }}</div>
      <div class="like clickable" @click="handleLike">
        <el-icon :size="16">
          <star v-if="!commentInfo.isLiked" />
          <star-filled v-else />
        </el-icon>
        <div class="like-count">{{ commentInfo.like_count }}</div>
      </div>
      <div class="comment clickable" @click="handleOpenDetail">
        <el-icon><chat-round /></el-icon>
        <div class="reply-count">{{ commentInfo.reply_count }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
import helperApi from "../../utils/helperMethods";
import instance from "../../utils/index";
export default {
  props: {
    commentInfo: {
      type: Object,
    },
  },
  data() {
    return {
      check: "true",
    };
  },
  computed: {
    userId: function () {
      return this.$store.state.userInfo.id;
    },
    isLogin: function () {
      return localStorage.getItem("isLogin");
    },
    isAdmin: function () {
      return this.$store.state.userInfo.isAdmin==1?true:false;
    },
  },
  methods: {
    convertUTC: helperApi.ConvertUTC,
    handleOpenDetail() {
      if (!this.isAdmin) {
        this.$store.commit("handleEnterComment", this.commentInfo.id);
        this.$router.push("/detail");
      }
    },
    handleLike() {
      if (this.isLogin && !this.isAdmin) {
        var params = {
          userId: this.userId,
          commentId: this.commentInfo.id,
          isLiked: this.commentInfo.isLiked,
        };
        instance
          .put("/comments/like", {
            data: params,
          })
          .then((res) => {
            if (res.data.status == 200) {
              this.$store.commit("handleComments", res.data.data);
            }
          });
      } else {
        this.$router.push("/login");
      }
    },
    handleEnabled(val) {
      var params = {
        enabled: val == true ? 1 : 0,
        commentId: this.commentInfo.id,
        isAdmin:this.isAdmin
      };
      instance
        .put("/comments/enabled", {
          data: params,
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.$store.commit("handleComments", res.data.data);
          }
        });
    },
  },
};
</script>

<style scoped>
.box-card {
  position: relative;
  margin-bottom: 10px;
  text-align: left;
  padding: 8px;
  width: 100%;
}

.title {
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
}
.title:hover {
  text-decoration: underline;
}
.author {
  font-size: 14px;
  display: inline-block;
  color: grey;
  margin-right: 10px;
}
.like {
  font-size: 14px;
  display: flex;
  align-items: center;
  color: grey;
  margin-right: 10px;
}
.like:hover {
  color: black;
}
.time {
  font-size: 14px;
  padding: 0 10px;
  display: inline-block;
  color: grey;
}
.content {
  font-size: 16px;
  margin: 10px 0;
  max-height: 60px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
}
.btn-wrapper {
  display: flex;
  align-items: center;
}
.reply-count {
  padding: 0 5px;
  display: inline-block;
}
.like-count {
  padding: 0 5px;
  display: inline-block;
}
.comment {
  display: flex;
  align-items: center;
  margin: 0 5px;
  color: grey;
}
.comment:hover {
  color: black;
}
.enabled {
  position: absolute;
  right: 10px;
  top: 10px;
}
.el-checkbox.is-bordered {
  padding: 0 9px 0 9px;
}
</style>
