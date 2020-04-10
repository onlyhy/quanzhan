<!--
 * @Date: 2020-04-08 15:46:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-10 10:20:31
 -->
<template>
     <m-card :icon="icon" :title="title">
      <div class="nav jc-between">
        <div class="nav-item" :class="{active: active === i}" 
        v-for="(category,i) in categories" :key="i"
        @click="$refs.list.$swiper.slideTo(i)">
          <div class="nav-link">{{category.name}}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper ref="list" @slide-change="()=>active = $refs.list.$swiper.realIndex">
          <swiper-slide v-for="(category,i) in categories" :key="i">
              <!-- 每个卡片的swiper内容可能是不一样的形式可能是文字列表可能是图片之类的，因此用具名插槽，在引用m-list-card的地方写上template -->
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
</template>
<script>
export default {
    data() {
        return {
            active:0
        }
    },
    methods: {
     
    },
    props:{
        icon:{type:String,required:true},
        title:{type:String,required:true},
        categories:{type:Array,required:true}
    }
}
</script>