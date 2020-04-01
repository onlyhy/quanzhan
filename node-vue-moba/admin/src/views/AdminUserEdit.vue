<!--
 * @Date: 2020-03-27 10:46:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-01 16:12:39
 -->
<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}管理员</h1>
    <!-- 在表单上加上阻止默认提交，不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    // save() {
    //   this.$http.post('admin_users',this.model)
    // },
    // 另一种写法
    async save() {
      //const res = await this.$http.post("admin_users", this.model);
      // 真实使用时前端要对后端返回数据做判断，判断是否新增成功
      if (this.id) {
        await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
    
  }
};
</script>