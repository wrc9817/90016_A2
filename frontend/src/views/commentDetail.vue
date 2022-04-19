<template>
  <el-row justify="center">
  <el-col :span="18">
    <div class="title"></div>
  </el-col>
  </el-row>
</template>

<script>
import instance from '../utils/index'
export default {
  methods:{
    
    fetchcommentAndReply(){
      var params = {
        commentId:this.commentId
      }
      instance
      .get('')
    }
  }
}
</script>

<style>

</style>