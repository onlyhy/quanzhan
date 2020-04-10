<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/home/03bbc2de1ee95d49603faaeab5fa3a50.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/home/3a349f0c3496eee4ec7276fe52ba5120.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/home/718181004680072.jpg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <!-- 具名插槽 category是在插槽处绑定的数据拿过来用-->
      <template #items="{category}">
        <div class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </div>
      </template>
    </m-list-card>

    <m-card icon="menu" title="英雄列表"></m-card>
    <m-card icon="menu" title="英雄列表"></m-card>
    <m-card icon="menu" title="英雄列表"></m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  name: "Home",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats:[]
      // newsCats: [
      //   {
      //     name: "热门",
      //     // 新建一个数组放5个元素，随便填充什么进去，然后map遍历，将每个元素换成我们要的对象
      //     newsList: new Array(5).fill(1).map(v => ({
      //       categoryName: "公告",
      //       title: "6月2日全服不停机更新公告",
      //       date: "06/01"
      //     }))
      //   },
      //   {
      //     name: "新闻",
      //     // 新建一个数组放5个元素，随便填充什么进去，然后map遍历，将每个元素换成我们要的对象
      //     newsList: new Array(5).fill(1).map(v => ({
      //       categoryName: "公告",
      //       title: "6月2日全服不停机更新公告",
      //       date: "06/01"
      //     }))
      //   },
      //   {
      //     name: "新闻",
      //     // 新建一个数组放5个元素，随便填充什么进去，然后map遍历，将每个元素换成我们要的对象
      //     newsList: new Array(5).fill(1).map(v => ({
      //       categoryName: "公告",
      //       title: "6月2日全服不停机更新公告",
      //       date: "06/01"
      //     }))
      //   },
      //   {
      //     name: "新闻",
      //     // 新建一个数组放5个元素，随便填充什么进去，然后map遍历，将每个元素换成我们要的对象
      //     newsList: new Array(5).fill(1).map(v => ({
      //       categoryName: "公告",
      //       title: "6月2日全服不停机更新公告",
      //       date: "06/01"
      //     }))
      //   },
      //   {
      //     name: "新闻",
      //     // 新建一个数组放5个元素，随便填充什么进去，然后map遍历，将每个元素换成我们要的对象
      //     newsList: new Array(5).fill(1).map(v => ({
      //       categoryName: "公告",
      //       title: "6月2日全服不停机更新公告",
      //       date: "06/01"
      //     }))
      //   }
      // ]
    };
  },
  created() {
    this.fetchNewsCats()
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    }
  },
};
</script>
<style lang="scss">
@import "../assets/scss/variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    // 整除4的不加边框
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
