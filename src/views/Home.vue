<template>
  <div>
    <div class="home" v-show="isShow">
      <!-- 搜索 -->
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        input-align="center"
      />
      <!-- 轮播 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, i) in swipers" :key="i">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="item.image_url"
          />
        </van-swipe-item>
      </van-swipe>
      <!-- 图标 -->
      <van-grid :column-num="5" :border="false">
        <van-grid-item
          v-for="(channel, ckey) in channels"
          :key="ckey"
          :icon="channel.icon_url"
          :text="channel.name"
        />
      </van-grid>
      <!-- 导航列表 -->
      <div class="bannerList">
        <van-row>
          <van-col span="24">
            <h3>品牌制造商直供</h3>
          </van-col>
        </van-row>
        <van-row>
          <van-col
            class="bannerItem"
            v-for="banner in banners"
            :key="banner.id"
            span="12"
          >
            <van-image
              width="100%"
              height="118px"
              fit="cover"
              :src="banner.pic_url"
            />
            <h4 class="bannerName">{{ banner.name }}</h4>
            <p class="bannerPrice">{{ banner.floor_price }}元起</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-show="!isShow">
      <van-row>
        <van-col span="24" style="padding: 20px 0">
          <van-skeleton title title-width="30%" :row="3" />
        </van-col>
        <van-col span="24" style="padding: 20px 0">
          <van-skeleton title title-width="30%" :row="3" />
        </van-col>
        <van-col span="24" style="padding: 20px 0">
          <van-skeleton title title-width="30%" :row="3" />
        </van-col>
        <van-col span="24" style="padding: 20px 0">
          <van-skeleton title title-width="30%" :row="3" />
        </van-col>
        <van-col span="24" style="padding: 20px 0">
          <van-skeleton title title-width="30%" :row="3" />
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onBeforeMount, nextTick } from "vue";
import { Options, Vue } from "vue-class-component";
import {
  Search,
  Swipe,
  SwipeItem,
  Image as VanImage,
  Grid,
  GridItem,
  Col as VanCol,
  Row as VanRow,
  Skeleton as VanSkeleton
} from "vant";
import { getIndex } from "@/api/index";
// 定义轮播图属性类型
interface Swiper {
  image_url?: string;
}

// 定义图标列表属性类型
interface Channel {
  icon_url?: string;
  id: number;
  name: string;
  sort_order: number;
  url: string;
}

// 导航栏接口
interface Banner {
  app_list_pic_url: string;
  floor_price: number;
  id: number;
  is_new: number;
  is_show: number;
  list_pic_url: string;
  name: string;
  new_pic_url: string;
  new_sort_order: number;
  pic_url: string;
  simple_desc: string;
  sort_order: number;
}

// @Options({
//
// })
export default defineComponent({
  // typeScript 用法 都是要用在外面定义
  // value = "";
  // // 轮播图
  // swipers: Swiper[] = [];
  // // 图标
  // channels: Channel[] = [];
  // // 导航
  // banners: Banner[] = [];
  // isShow = false;
  components: {
    "van-search": Search,
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-image": VanImage,
    "van-grid": Grid,
    "van-grid-item": GridItem,
    VanCol,
    VanRow,
    VanSkeleton
  },
  setup() {
    const data = reactive({
      value: "",
      swipers: [],
      channels: [],
      banners: [],
      isShow: false
    });
    onBeforeMount(async () => {
      data.isShow = true;
      const res = await getIndex();
      console.log(res.data);
      nextTick(() => {
        data.swipers = res.data.data.banner;
        data.channels = res.data.data.channel;
        data.banners = res.data.data.brandList;
      });
    });

    // console.log(123);
    return data;
  }
});
</script>

<style lang="less">
.my-swipe {
  width: 375px;
  height: 200px;
}

.bannerList {
  h3 {
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    padding: 10px 0;
  }
}

.bannerItem {
  position: relative;
  .bannerName {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .bannerPrice {
    position: absolute;
    top: 30px;
    left: 5px;
    color: #999;
  }
}
</style>
