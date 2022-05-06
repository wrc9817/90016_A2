<template>
  <div class="login-page">
    <el-card class="card">
      <div v-if="!isSignUp">
        <div class="title">Sign In</div>
        <el-form 
          class="form"
          status-icon
          :rules="loginRules"
          :model="login"
          ref="loginForm"
        >
          <el-form-item prop="email">
            <el-input placeholder="Email" v-model="login.email" autocomplete="true">
              <template #prefix>
                <el-icon class="el-input__icon" :size="16"><message /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="password" v-model="login.password" show-password autocomplete="true">
              <template #prefix>
                <el-icon class="el-input__icon" :size="16"><key /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <div class="btn-wrapper">
            <div class="login">
              <el-button type="primary" @click="handleLogin">Login</el-button>
            </div>
            <div class="signup">
              <el-button type="text" @click="handleOpenSignUp"
                >Sign Up</el-button
              >
            </div>
          </div>
        </el-form>
      </div>
      <div v-else>
        <div class="title">Sign Up</div>
        <el-form
          class="form"
          status-icon
          :rules="signUpForm"
          :model="signUp"
          ref="signUpForm"
        >
          <el-form-item prop="email">
            <el-input v-model="signUp.email" placeholder="Email">
              <template #prefix>
                <el-icon class="el-input__icon" :size="16"><message /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="signUp.password" placeholder="New password" show-password>
              <template #prefix>
                <el-icon class="el-input__icon" :size="16"><key /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirm">
            <el-input placeholder="Confirm password" v-model="signUp.confirm" show-password>
              <template #prefix>
                <el-icon class="el-input__icon" :size="16"><key /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <div class="btn-wrapper">
            <div class="login">
              <el-button type="primary" @click="handleSignUp">Sign Up</el-button>
            </div>
            <div class="signup">
              <el-button type="primary" @click="handleBackToLogin">back</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import instance from "../utils/index";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      isSignUp: false,
      login: {
        email: "",
        password: "",
      },
      loginRules: {
        email: [
          {
            required: true,
            message: "Please type your email",
            trigger: "blur",
          },
          {
            pattern:/^(([A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)|admin)/,
            message: "Not valid email address",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please type your password",
            trigger: "blur",
          },
        ],
      },
      signUp: {
        email: "",
        password: "",
        confirm: "",
      },
      signUpForm: {
        email: [
          {
            required: true,
            message: "Please type your email",
            trigger: "blur",
          },
          {
            pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ ,
            message: "Not valid email address",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please type your password",
            trigger: "blur",
          },
        ],
        confirm: [
          {
            required: true,
            message: "Please confirm your password",
            trigger: "blur",
          },
          {
              validator:this.confirmValidator,
              trigger: "blur",
          }
        ],
      },
    };
  },
  methods: {
    adminValidator(rule, value, callback){
      if (value === "admin") {
        callback();
      }
    },
    confirmValidator(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.signUp.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    handleOpenSignUp() {
      this.isSignUp = true;
    },
    handleSignUp() {
      this.$refs["signUpForm"].validate((valid) => {
        if (valid) {
          instance
            .post("/users", {
              data: this.signUp,
            })
            .then((res) => {
              if (res.data.status == 200) {
                ElMessage({
                  type: "success",
                  message: res.data.message,
                });
                this.isSignUp = false;
              } else if (res.data.status == 0) {
                ElMessage({
                  type: "warning",
                  message: res.data.message,
                });
              }
            });
        }
      });
    },
    handleLogin() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          instance
            .get("/users", {
              params: this.login,
            })
            .then( (res) => {
              if (res.data.status == 200) {
                localStorage.setItem("isLogin", true);
                this.$store.commit("handleLogin",res.data.data)
                this.$store.dispatch("fetchComments")
                this.$router.push("/");
                ElMessage({
                  type: "success",
                  message: res.data.message,
                });
              }else{
                ElMessage({
                  type: "error",
                  message: res.data.message,
                });
              }
            });
        }
      });
    },
    handleBackToLogin() {
      this.isSignUp = false;
    },
  },
};
</script>
<style>
.el-form-item__label {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.card {
  width: 450px;
}

.form {
  padding: 0 10px;
}

.title {
  padding: 30px 10px;
  font-size: 30px;
  text-align: left;
  font-weight: bold;
}

.icon {
  display: flex;
  align-items: center;
  padding: 0 0 0 10px;
}
.btn-wrapper {
  text-align: left;
}
.login {
  display: inline-block;
  text-align: left;
  width: 50%;
}

.signup {
  display: inline-block;
  width: 50%;
  text-align: right;
}
</style>
