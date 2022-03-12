<template>
  <div class="category">
    <!-- 搜索 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      input-align="center"
    />
    <van-tree-select
      height="calc(100vh - 104px)"
      :items="items"
      v-model:main-active-index="active"
      @click-nav="changeCurrent"
    >
      <template #content>
        <div style="padding: 10px" v-if="items[active]['banner_url']">
          <van-image
            width="100%"
            height="auto"
            :src="items[active]['banner_url']"
          />
        </div>
        <van-grid
          :gutter="10"
          :column-num="3"
          v-if="items[active]['subCategoryList']"
        >
          <van-grid-item
            v-for="(item, index) in items[active]['subCategoryList']"
            :key="index"
            :icon="item.banner_url"
            :text="item.name"
          />
        </van-grid>
      </template>
    </van-tree-select>
  </div>
</template>
<script lang="ts">
import { reactive, defineComponent, onBeforeMount } from "vue";
import {
  Search as vanSearch,
  TreeSelect as vanTreeSelect,
  Image as vanImage,
  Grid as vanGrid,
  GridItem as vanGridItem,
} from "vant";

import { getCategory, getCataLogCurrent } from "@/api/index";

interface Category {
  text: string;
  id: number;
}

interface Data {
  active: number;
  items: Category[];
  changeCurrent: any;
}

export default defineComponent({
  components: {
    vanSearch,
    vanTreeSelect,
    vanImage,
    vanGrid,
    vanGridItem,
  },
  setup() {
    const data: Data = reactive({
      value: "",
      active: 0,
      items: [],
      async changeCurrent(index: any) {
        console.log(index);
        const result = await getCataLogCurrent(data.items[data.active].id);
        data.items[index] = {
          ...result.data.data.currentCategory,
          text: data.items[index].text,
        };
        console.log(result);
      },
    });
    onBeforeMount(async () => {
      const result = await getCategory();
      console.log(result.data.data.categoryList);
      const items = result.data.data.categoryList;
      items.forEach((element: { [x: string]: any; name: any }) => {
        element["text"] = element.name;
      });
      data.items = items;
    });
    return data;
  },
});
</script>
