<template>
    <div class="wrapper">
            <van-nav-bar
                    :title="title"
                    left-text="退出房间"
                    left-arrow
                    @click-left="onOutRoom"
            />
        <div class="chatView">

        </div>
        <div class="mySendContent">
            <van-cell-group>
                <van-field v-model="content"  placeholder="请输入发送内容" />
            </van-cell-group>
        </div>

    </div>
</template>
<script>
    import {roomInfo , outRoom} from '../../api/chat'

    export default {
        data() {
            return {
                title:'',
                group_count: 0,
                content: ''
            }
        },
        computed: {
            //计算数据
        },
        mounted() {
            this.chat()
        },
        methods: {
            chat() {
                roomInfo().then(res => {
                    this.group_count = res.data.group_count
                    this.title = res.data.user_room.room.name + ' 号房间('+this.group_count+')'
                })
            },
            onOutRoom() {
                outRoom().then(res => {
                    if (res.code === 200){
                        this.$router.push('/main')
                    }
                })
            }
        }
    }
</script>
<style>
    .mySendContent {
        margin-top: -50px;
        height: 50px;
        position:absolute;
        bottom:0;
    }
    .chatView {
        padding-bottom: 50px;
        height: 100%;
    }
    .wrapper {
        box-sizing: border-box;
        min-height: 100%;
        padding-bottom: 50px;
    }
</style>