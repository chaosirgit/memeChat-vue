<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
    data() {
      return {
          transitionName: ''
      }
    },
    watch: {//使用watch 监听$router的变化
    $route(to, from) {
        //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
        // if(to.meta.index > 0){
        //     if( to.meta.index < from.meta.index){
        //         this.transitionName = 'slide-right';
        //     }else{
        //         this.transitionName = 'slide-left';
        //     }
        // }else if(to.meta.index === 0 && from.meta.index > 0){
        //     this.transitionName = 'slide-right';
        // }
        if (to.path != '/user' || to.path != '/main') {

            //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
            if( to.meta.index < from.meta.index){
                this.transitionName = 'slide-right';
            }else{
                this.transitionName = 'slide-left';
            }
        }

    }
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
}

  html,body {
    height: 100%;
    margin: 0;
  }
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all .3s;
  position: absolute;
  width:100vw;
  left:0;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

    .card {

    /*border:2px solid;*/
    border-radius:25px;
    -moz-border-radius:25px; /* Old Firefox */
    }
  .shadow {
    box-shadow: 7px 7px 5px #888888;
  }
.box {
  display: flex;
  flex-flow:column;
  justify-content: center;
  height: 100%;
  align-items: center;
}
</style>
