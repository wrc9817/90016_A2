<template>
  <router-view/>
</template>
<script>
import instance from './utils/index'
export default {
  created() {
    this.init()
  },
  computed:{
    commentId:function(){
      return this.$store.state.commentId
    }
  },
  methods:{
    init(){
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(localStorage.getItem("store"))))
      window.addEventListener("beforeunload",()=>{
        localStorage.setItem("store",JSON.stringify(this.$store.state))
      })
      this.$store.dispatch("fetchComments")
    },
    fetchcommentAndReply(){
      var params = {
        commentId:this.commentId
      }
      instance
      .get('/comments/detail',{
        params:params
      })
      .then((res)=>{
        this.$store.commit("handleCommentDetail",res.data.data)
      })
    }
  },
  watch:{
    $route(to,from){
      if(to.path=='/detail'){
        this.fetchcommentAndReply()
      }
    },
    "$store.state.userInfo.id":{
      deep:true,
      handler:function(newVal,oldVal){
        if(newVal){
          this.$store.dispatch("fetchComments")
        }
      }
    }
  }
}
</script>
<style>
body{
  margin:0 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.clickable:hover{
  cursor: pointer;
}
</style>
