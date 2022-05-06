<template>
<div class="main">
  <div class="avatar">
    <el-avatar :src="detail.avatar?detail.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
  </div>
  <div class="body">
    <div class="header">
      <div class="author">{{detail.author.split("@")[0]}}</div>
      <div class="date">{{ConvertToUTC(detail.time)}}</div>
    </div>
    <div class="content">
      {{detail.content}}
    </div>
  </div>
</div>
  
</template>

<script>
import helperApi from '../../utils/helperMethods'
export default {
  props:{
    detail:{
      type:Object
    }
  },
  computed:{
    avatar:function(){
      return this.$store.state.userInfo.avatar
    }
  },
  methods:{
    ConvertToUTC: helperApi.ConvertUTC,
  }
}
</script>

<style scoped>
.main{
  display:flex;
  padding:10px 0;
    border-bottom: 1px solid #eee;

}
.header{
  font-size: 14px;
  padding:0 0 10px 0;
  text-align: left;
  color:grey;
}
.body{
  display:inline-block;
  padding:10px;
}
.author{
  display:inline-block;
  padding:0 10px 0 0;
}
.date{
  display:inline-block;
  padding:0 10px;
}
.content{
  text-align: left;
}
.avatar{
  display:inline-block;
  padding:10px 0;
}
</style>