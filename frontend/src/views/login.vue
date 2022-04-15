<template>
    <div class="login-page">
        <el-card class="card">
            <div v-if="!isSignUp">
                <div class="title">Sign In</div>
                <el-form class="form">
                    <el-form-item>
                        <el-input placeholder="Email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="password"></el-input>
                    </el-form-item>
                    <div class="btn-wrapper">
                        <div class="login">
                            <el-button type="primary">LOGIN</el-button>
                        </div>
                        <div class="signup">
                            <el-button type="text" @click="handleOpenSignUp">Sign Up</el-button>
                        </div>
                    </div>
                </el-form>
            </div>
            <div v-else>
                <div class="title">Sign Up</div>
                <el-form class="form">
                    <el-form-item>
                        <el-input placeholder="Email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="New password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="Confirm password"></el-input>
                    </el-form-item>
                    <div class="btn-wrapper">
                        <div class="login">
                            <el-button type="primary" @click="handleSignUp">Sign Up</el-button>
                        </div>
                    </div>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import instance from '../utils/index'
    export default {
        data() {
            return {
                isSignUp: false,
            }
        },
        methods:{
            handleOpenSignUp(){
                this.isSignUp = true
            },
            handleSignUp(){
                instance.get('/users/home')
                .then((res)=>{
                    console.log(res);
                })
            }
        }
    }
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
.btn-wrapper{
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