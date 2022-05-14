<template>
  <el-row justify="center" :gutter="0" class="comment-body">
    <el-col :span="16">
      <el-row>
        <el-col :span="24">
          <el-card class="main">
          <div class="title">{{featureDetail.title}}</div>
          <div class="content">{{featureDetail.content}}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  computed:{
    featureDetail:function(){
      return this.$store.state.featureDetail
    }
  }
}
</script>

<style scoped>
.main{
  padding:0 10px;
  min-height: 500px;
}
.title{
  text-align: left;
  padding:15px 0px;
  font-size: 20px;
  font-weight: bold;
}
.content{
  text-align: left;
  padding:10px 0;
  font-size: 16px;
}
</style>