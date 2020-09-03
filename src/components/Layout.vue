<template>
    <div style="height:100%;">
        <slot name="nav-bar">
            <van-nav-bar
                    title=""
                    left-arrow
                    @click-left="onClickLeft"
            />
        </slot>
        <div>
            <slot name="main"></slot>
        </div>
        <van-tabbar route>
            <van-tabbar-item replace to="/main" icon="wap-home">
                聊天
            </van-tabbar-item>
            <van-tabbar-item replace to="/user" icon="manager">
                我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    export default {
        name: 'Layout', //组件名称
        data() {
            return {
                username:'',
            }
        },
        computed: {
            //计算数据
        },
        mounted() {
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            }
        }
    }
</script>
<style>

</style>