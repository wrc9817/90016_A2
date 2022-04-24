<template>
  <el-dialog
    v-model="dialog"
    :show-close="false"
    custom-class="new-comment"
    :append-to-body="true"
  >
    <el-form
      class="new-comment-wrapper"
      :rules="rules"
      :model="comment"
      ref="comment"
    >
      <el-form-item prop="title">
        <el-input
          v-model="comment.title"
          placeholder="Title (5~50 characters)"
          size="large"
          show-word-limit
          maxlength="50"
          minlength="5"
        ></el-input>
      </el-form-item>
      <div class="divider"></div>
      <el-form-item prop="content">
        <el-input
          v-model="comment.content"
          placeholder="description"
          :rows="10"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <div class="btn-wrapper">
      <el-button type="primary" round @click="handlePost">Post</el-button>
    </div>
  </el-dialog>
</template>

<script>
import instance from "../../utils/index";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      comment: {
        title: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "Title cannot be empty" }, //验证非空
          { min: 5, max: 50, message: "At least 5 characters" }, //验证数字长度位14-16位
        ],
        content: [
          { required: true, message: "Description cannot be empty" }, //验证非空
          { min: 5, max: 300, message: "At least 5 characters" }, //
        ],
      },
    };
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.newCommentDialog;
      },
      set(v) {
        this.$store.commit("handleOpenCommentDialog", v);
      },
    },
    userId: function () {
      return this.$store.state.userInfo.id;
    },
    email:function(){
      return this.$store.state.userInfo.email
    }
  },
  methods: {
    handlePost() {
      this.$refs["comment"].validate((valid) => {
        if (valid) {
          var param = {
            userId:this.userId,
            ...this.comment,
            authorId: this.userId,
            authorName:this.email
          };
          instance
            .post("/comments", {
              data: param,
            })
            .then((res) => {
              if (res.data.status == 200) {
                this.$store.commit("handleComments",res.data.data)
                this.dialog = false
                ElMessage({
                  type: "success",
                  message: res.data.message,
                });
              }
            });
        }
      });
    },
  },
};
</script>

<style>
.new-comment .el-input__inner {
  box-shadow: none;
  height: 50px;
  font-size: 24px;
}
.new-comment .el-form-item.is-error .el-input__inner {
  box-shadow: none;
}
.new-comment .el-input__inner::-webkit-input-placeholder {
  font-size: 24px;
}
.el-textarea__inner {
  box-shadow: none !important;
  padding: 5px 10px !important;
  resize: none;
}
.el-textarea__inner::-webkit-input-placeholder {
  font-size: 16px;
}
</style>
<style scoped>
.btn-wrapper {
  text-align: right;
}
.divider {
  margin: 0 10px 10px 10px;
  border: 1px solid whitesmoke;
}
</style>
