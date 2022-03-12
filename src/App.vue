<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" v-show="show">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/zt">专题</van-tabbar-item>
      <van-tabbar-item icon="cluster-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/buyCar">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template> 

<script lang="ts">
import { reactive, defineComponent, onBeforeMount, nextTick,watch } from "vue";
import { Tabbar as vanTabbar, TabbarItem as vanTabbarItem } from "vant";
import { useRoute, useRouter } from "vue-router"; 

interface Data {
  active: number;
}

export default defineComponent({
  components: {
    vanTabbar,
    vanTabbarItem,
  },
  setup() {
    const data = reactive({
      active: 0,
      show:true
    });
    // 监听路由的变化
    const route = useRoute();
    const pathArr = ['/','/zt','/category','/buyCar','/me'];
    watch(()=>route.path,(path)=>{
      // 监听路由跳转的地址
      console.log(path);
      // 判断是否存在数组里
      console.log(pathArr.indexOf(path));
      if(pathArr.indexOf(path)!=-1){
        data.show = true;
        data.active = pathArr.indexOf(path);
      }else{
        data.show = false;
        data.active = pathArr.indexOf(path);
      }
    })
    console.log(route.path);
    return data;
  },
});
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
