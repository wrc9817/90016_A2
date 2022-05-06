<template>
  <el-dialog
    v-model="dialog"
    width="45%"
    :before-close="handleClose"
    :append-to-body="true"
    :destroy-on-close="true"
  >
    <div>
      <div class="title">Manage User</div>
      <div class="user-list">
        <el-table :data="userList" :height="400">
          <el-table-column prop="id" label="id" width="50"></el-table-column>
          <el-table-column prop="email" label="email"></el-table-column>
          <el-table-column
            prop="isActive"
            width="140"
            label="status"
            align="center"
          >
            <template #default="scope">
              <div class="status">
                <el-button
                  type="text"
                  :disabled="scope.row.isActive == 1 ? false : true"
                  class="btn"
                  @click="handleBlock(scope.row)"
                  >block</el-button
                >
                <span class="divider">|</span>
                <el-button
                  type="text"
                  :disabled="scope.row.isActive == 1 ? true : false"
                  class="btn"
                  @click="handleActive(scope.row)"
                  >active</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import instance from "../../utils/index";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      userList: [],
    };
  },
  watch: {
    dialog: function (newVal, oldVal) {
      if (newVal) {
        this.getUsers();
      }
    },
  },
  methods: {
    handleActive(val) {
      var params = {
        userId: val.id,
      };
      instance
        .put("/users/active", {
          data: params,
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.userList = res.data.data;
            ElMessage({
              type: "success",
              message: res.data.message,
            });
          }
        });
    },
    handleBlock(val) {
      var params = {
        userId: val.id,
      };
      instance
        .put("/users/block", {
          data: params,
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.userList = res.data.data;
            ElMessage({
              type: "success",
              message: res.data.message,
            });
          }
        });
    },
    getUsers() {
      instance.get("/users/all").then((res) => {
        if (res.data.status == 200) {
          this.userList = res.data.data;
          console.log(res);
        }
      });
    },
    handleClose() {
      this.dialog = false;
    },
  },
  computed: {
    dialog: {
      get() {
        console.log(this.$store.state.audit);
        return this.$store.state.audit;
      },
      set(v) {
        this.$store.commit("handleOpenAudit", v);
      },
    },
  },
};
</script>

<style scoped>
.status {
  display: flex;
  align-items: center;
}
.divider {
  padding: 0 10px;
}
.btn {
  background: transparent;
}
.btn:hover {
  background: transparent;
}
.title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
</style>
