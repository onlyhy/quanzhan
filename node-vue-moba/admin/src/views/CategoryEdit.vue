<!--
 * @Date: 2020-03-27 10:46:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-27 16:20:18
 -->
<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}分类</h1>
    <!-- 在表单上加上阻止默认提交，不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
       <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      parents:[]
    };
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  },
  methods: {
    // save() {
    //   this.$http.post('categories',this.model)
    // },
    // 另一种写法
    async save() {
      //const res = await this.$http.post("categories", this.model);
      // 真实使用时前端要对后端返回数据做判断，判断是否新增成功
      if (this.id) {
        await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents(){
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  }
};
</script>