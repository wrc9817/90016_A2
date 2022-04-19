<template>
  <el-dialog v-model="dialog" width="35%" :before-close="handleClose" :append-to-body="true" :destroy-on-close="true">
    <div>
      <div class="title">
        <el-avatar
          :size="'large'"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <div class="email">{{ userInfo.email }}</div>
      </div>
      <div class="form">
        <div class="row">
          <div class="inline">
            <el-input placeholder="First Name" v-model="userInfo.first_name"></el-input>
          </div>
          <div class="inline">
            <el-input placeholder="Last Name" v-model="userInfo.last_name"></el-input>
          </div>
        </div>
        <div class="row">
          <el-select placeholder="Age" class="age" v-model="userInfo.age">
            <el-option v-for="i in 100" :key="i" :label="i" :value="i">
              {{ i }}
            </el-option>
          </el-select>
          <el-select placeholder="Gender" class="gender" v-model="userInfo.gender">
            <el-option label="male" value="1"></el-option>
            <el-option label="female" value="2"></el-option>
          </el-select>
        </div>
        <div class="row">
          <el-input
          v-model="userInfo.location"
          class="location"
            maxlength="30"
            placeholder="Location"
            show-word-limit
          />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import instance from '../../utils/index'
import loginVue from '../../views/login.vue';
export default {
  data(){
    return {
      isChanged:false
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.profileDialog;
      },
      set(v) {
        this.$store.commit("handleOpenProfile", v);
      },
    },
    userInfo:{
      get(){
        return this.$store.state.userInfo
      },
      // set(v){
      //   this.$store.commit("handleLogin",v)
      // }
    },
  },
  watch:{
    dialog:{
      handler:function(newVal,oldVal){
        if(oldVal==false && newVal==true){
          this.isChanged = false
        }else if(newVal == false && oldVal == true && this.isChanged==true){
          this.handleSave()
        }
      }
    },
    userInfo:{
      deep:true,
      handler:function(newVal,oldVal){
        if(newVal){
          this.isChanged = true
        }
      }
    }
  },
  methods: {
    handleSave(){
      instance
            .put("/users", {
              data: this.userInfo,
            })
            .then( (res) => {
              if (res.data.status == 200) {
                this.$store.commit("handleLogin",res.data.data[0])
                ElMessage({
                  type: "success",
                  message: res.data.message,
                });
              }else{
                console.log(res.data);
              }
            });
    },
    handleClose() {
      this.dialog = false;
    },
  },
};
</script>
<style>
.age.el-select .el-input__inner {
  /* box-shadow:none !important; */
  /* width: 80px; */
}
</style>
<style scoped>
.email {
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  padding: 5px 0;
}
.form {
  padding: 10px 20px;
}
.title{
  text-align: center;
}
.row {
  text-align: left;
  padding: 5px 35px;
}
.inline {
  display: inline-block;
  margin-right: 20px;
}
.left {
  text-align: left;
}
.gender{
  margin-left:20px;
}
.location{
  width:95%;
}
</style>
