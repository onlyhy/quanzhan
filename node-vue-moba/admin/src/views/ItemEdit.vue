<!--
 * @Date: 2020-03-27 10:46:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-02 14:57:20
 -->
<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}物品</h1>
    <!-- 在表单上加上阻止默认提交，不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- 因为这里的action里执行的是ele的方法不走axios所以没有校验，需要在方法上单独加上请求头的token，这里都是用的在main.js中定义的mixin -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeadersMixin()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      model: {}
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    // 图片上传成功
    afterUpload(res){
      // vue的显式赋值，因为一开始model里面没有定义name属性，普通赋值方法有可能会赋值失败！
      // 根据后端返回的信息展示图片
      this.$set(this.model,'icon',res.url)
      // this.model.icon = res.url
    },
    // save() {
    //   this.$http.post('items',this.model)
    // },
    // 另一种写法
    async save() {
      //const res = await this.$http.post("items", this.model);
      // 真实使用时前端要对后端返回数据做判断，判断是否新增成功
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    }
  }
};
</script>
