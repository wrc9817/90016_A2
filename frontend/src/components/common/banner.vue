<template>
  <el-row class="header">
    <el-col :span="4" class="home">
      <span class="btn clickable" @click="handleHome">Protect The Species</span>
    </el-col>
    <el-col :span="2" class="userInfo-wrapper" :offset="16">
      <div v-if="!isLogin">
        <span class="login clickable" @click="RouterToLogin">LOGIN/SIGNUP</span>
      </div>
      <div v-else>
        <el-popover
          placement="bottom"
          :show-arrow="false"
          :width="100"
          trigger="click"
        >
          <template #reference>
            <span class="login clickable">{{ userName }}</span>
          </template>
          <template #default>
            <div>
              <div
                class="clickable text-centered userMenuItem"
                @click="handleOpenProfile"
              >
                <el-icon class="icon"><setting /></el-icon> Setting
              </div>
              <div
                class="clickable text-centered userMenuItem"
                @click="RouterToLogout"
              >
                <el-icon class="icon"><switch-button /></el-icon> Logout
              </div>
            </div>
          </template>
        </el-popover>
      </div>
    </el-col>
    <el-col :span="2" class="post">
      <span class="item clickable" @click="handleOpenNewCommentDialog">
        <span class="iconfont">&#xe617;</span> POST
      </span>
    </el-col>
    <Profile></Profile>
    <NewComment></NewComment>
  </el-row>
</template>

<script>
import Profile from "../dialog/profile.vue";
import NewComment from "../dialog/newComment.vue";
export default {
  components: {
    Profile,
    NewComment,
  },
  methods: {
    handleHome() {
      this.$router.push("/");
    },
    RouterToLogin() {
      this.$router.push("/login");
    },
    RouterToLogout() {
      localStorage.clear();
      this.$router.push("/login");
      this.$store.commit("handleLogout");
    },
    handleOpenProfile() {
      this.$store.commit("handleOpenProfile", true);
    },
    handleOpenNewCommentDialog() {
      this.newCommentDialog = true;
    },
  },
  computed: {
    isLogin: function () {
      return localStorage.getItem("isLogin") ? true : false;
    },
    userName: function () {
      var email = this.$store.state.userInfo.email
        ? this.$store.state.userInfo.email
        : "";
      var userName = email.split("@")[0];
      return userName;
    },
    newCommentDialog: {
      get() {
        return this.$store.state.newCommentDialog;
      },
      set(v) {
        this.$store.commit("handleOpenCommentDialog", v);
      },
    },
  },
};
</script>

<style scoped>
.header {
  background: black;
  align-items: center;
  color: white;
  font-size: 16px;
  padding: 10px 0;
  letter-spacing: 1px;
}

.userInfo-wrapper {
  font-size: 14px;
  font-weight: normal;
  flex: 0 0 10%;
}
.text-centered {
  text-align: center;
}
.userMenuItem {
  font-size: 16px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.userMenuItem:hover {
  color: #606266b4;
}
.icon {
  padding: 0 5px;
}
</style>
