<template>
  <div class="header">
      <div class="home">
          <span class="btn clickable">Protect The Species</span>
      </div>
      <div class="menu-wrapper">
          <div class="menu">
              <span class="item clickable">About</span>
              <span class="item clickable">Contact</span>
              <span class="item clickable">Other</span>
          </div>
      </div>
      <div class="userInfo-wrapper">
          <div v-if="!isLogin">
              <span class="login clickable" @click="RouterToLogin">LOGIN/SIGNUP</span>
          </div>
          <div v-else>
              <span class="login clickable" @click="RouterToLogout">{{userName}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
methods:{
    RouterToLogin(){
        this.$router.push('/login')
    },
    RouterToLogout(){
        localStorage.clear()
        this.$router.push('/login')
    }
},
computed:{
    isLogin:function(){
        return localStorage.getItem('isLogin')?true:false
    },
    userName:function(){
        return this.$store.state.userName
    }
}
}
</script>

<style scoped>
.header{
    background: black;
    display:flex;
    align-items: center;
    color:white;
    font-size: 16px;
    padding:10px 0;
    letter-spacing: 1px;
}
.home{
    flex:0 0 20%;
}
.home .btn{
    display:inline-block;
    width:20px;
}

.menu-wrapper{
flex:0 0 60%;
}
.menu{
    margin:0 100px;
    display:flex;
    justify-content: flex-end;
}
.menu .item{
    padding:0 20px;
}
.userInfo-wrapper{
    font-size: 14px;
    font-weight: normal;
    flex:0 0 10%;
}

</style>