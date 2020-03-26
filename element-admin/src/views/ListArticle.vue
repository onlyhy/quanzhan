<!--
 * @Date: 2020-03-26 10:07:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-26 15:56:27
 -->
<template>
  <div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题" width="140"></el-table-column>
      <el-table-column prop="body" label="内容" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      articles: []
    };
  },
  methods: {
    //   获取数据
    fetch() {
      this.$http.get("articles").then(res => {
        this.articles = res.data;
      });
    },
    edit(id) {
        this.$router.push(`/articles/${id}/edit`)
    },
    // 删除数据
    remove(id) {
      // 地址用模板字符串
      this.$http.delete(`articles/${id}`).then(() => {
        this.$message({
          message: "文章删除成功",
          type: "success"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>