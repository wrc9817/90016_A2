<template>
  <div class="header">
    <div class="home">
      <span class="btn clickable">Protect The Species</span>
    </div>
    <div class="menu-wrapper">
      <div class="menu">
        <span class="item clickable" @click="handleOpenNewCommentDialog">POST</span>
      </div>
    </div>
    <div class="userInfo-wrapper">
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
            <span class="login clickable">{{
              userName
            }}</span>
          </template>
          <template #default>
              <div>
                <div class="clickable text-centered userMenuItem" @click="handleOpenProfile">
                   <el-icon class="icon"><setting /></el-icon> Setting
                </div>
                <div class="clickable text-centered userMenuItem" @click="RouterToLogout">
                    <el-icon class="icon"><switch-button /></el-icon> Logout
                </div>  
              </div>
          </template>
        </el-popover>
      </div>
    </div>
    <Profile></Profile>
    <NewComment></NewComment>
  </div>
</template>

<script>
import Profile from '../dialog/profile.vue'
import NewComment from '../dialog/newComment.vue'
export default {
    components:{
        Profile,
        NewComment
    },
  methods: {
    RouterToLogin() {
      this.$router.push("/login");
    },
    RouterToLogout() {
      localStorage.clear();
      this.$router.push("/login");
      this.$store.commit("handleLogout");
    },
    handleOpenProfile(){
        this.$store.commit("handleOpenProfile",true)
    },
    handleOpenNewCommentDialog(){
        this.newCommentDialog = true
    }
  },
  computed: {
    isLogin: function () {
      return localStorage.getItem("isLogin") ? true : false;
    },
    userName: function () {
      var email = this.$store.state.userInfo.email? this.$store.state.userInfo.email : "";
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
  display: flex;
  align-items: center;
  color: white;
  font-size: 16px;
  padding: 10px 0;
  letter-spacing: 1px;
}
.home {
  flex: 0 0 20%;
}
.home .btn {
  display: inline-block;
  width: 20px;
}

.menu-wrapper {
  flex: 0 0 60%;
}
.menu {
  margin: 0 100px;
  display: flex;
  justify-content: flex-end;
}
.menu .item {
  padding: 0 20px;
}
.userInfo-wrapper {
  font-size: 14px;
  font-weight: normal;
  flex: 0 0 10%;
}
.text-centered{
    text-align: center;
}
.userMenuItem{
    font-size: 16px;
    padding:10px;
    display:flex;
    align-items: center;
    justify-content:center;
}
.userMenuItem:hover{
    color:#606266b4;
}
.icon{
    padding:0 5px;
}
</style>
