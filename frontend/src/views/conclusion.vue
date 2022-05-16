<template>
  <el-row justify="center" :gutter="0" class="conclusion-body">
    <el-col :span="18">
      <el-row>
        <el-col :span="24">
          <el-card shadow="always">
            <div class="title-wrapper">
              <span class="title">About Us</span>
            </div>
            <div class="content-wrapper">
              <span class="content"
                >In our plan, we estimated we need 56 days to finish the whole
                project which contains 47 tasks, and planned 8 days to finish 9
                tasks between week 10 milestone and week 11 milestone. When
                testing the registration and sign-in system, if there are lots
                of users utilizing the function, the database cannot handle this
                kind of issue well, some users show that they cannot log in
                normally, so we paid half a day more on handling this problem.
                In addition, our SQL code is too redundant on searching the
                database, causing unnecessary waste of system resources,
                therefore, we also paid half a day more on dealing with this
                problem. However, we save the time in task 5.7 for half of a
                day, and in the second round of testing, because we already had
                experience in the first round of testing, and the first round of
                testing has covered most of the things that can go wrong, there
                is nothing in the second round that has not been taken into
                account before, as a result, we have saved 2 day.
              </span>
              <div class="img-wrapper">
                <!-- <img src="../assets/img/1.jpg" class="img"/> -->
                <el-carousel
                  :interval="4000"
                  trigger="click"
                  height="320px"
                >
                  <el-carousel-item v-for="item in videoList" :key="item">
                    <img :src="item" class="img" />
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data(){
    return{
         videoList: [
        require("../assets/img/1.jpg"),
        require("../assets/img/2.jpg"),
        require("../assets/img/3.jpg"),
        require("../assets/img/4.jpg"),
        require("../assets/img/5.jpg"),
        require("../assets/img/6.jpg"),
        require("../assets/img/7.jpg"),
        require("../assets/img/8.jpg"),
      ],
    }
  }
};
</script>

<style scoped>
.conclusion-body {
  padding: 20px 0;
}
.title-wrapper {
  display: flex;
}
.img-wrapper {
  width:100%;
  flex: 0 1 auto;
  padding: 10px;
}
.img {
  width: 100%;
  height: 100%;
  /* width:250px;
  height:200px; */
}
.title {
  padding: 15px 10px;
  font-size: 32px;
  font-weight: bold;
  display: inline-block;
}
.content-wrapper {
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.content {
  font-size: 15px;
  font-weight: 500;
  padding: 10px;
  flex: 0 0 50%;
  display: inline-block;
  text-align: left;
}
/* .img {
  width: 400px;
  height: 300px;
} */
</style>
