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
      <div class="swiper-pagination pagination-home text-right px-3 pb-2"
      slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      swiperOptions:{
         pagination: {
            el: '.pagination-home'
          },
      }
    }
  },
};
</script>
<style lang="scss">
@import '../assets/scss/variables.scss';
  .pagination-home{
    .swiper-pagination-bullet{
      opacity: 1;
      border-radius: 0.1538rem;
      background:map-get($colors, 'white' );
      &.swiper-pagination-bullet-active{
        background: map-get($colors, 'info' );
      }
    }
  }
</style>
