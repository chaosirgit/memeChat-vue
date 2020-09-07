<template>
    <div class="wrapper">
        <van-nav-bar
                :title="title"
                left-text="退出房间"
                left-arrow
                @click-left="onOutRoom"
        />
        <div class="chatView" id="chatView">
            <div v-for="(chat, index ) in chatList" :key="index" >
                <van-row type="flex" class="mb-10"  v-if="chat.is_self == 0">
                    <van-col span='4' class="relative">
                        <van-image
                                class="avator"
                                :src="chat.user.avatar"
                        />
                        <span class="triangle-l"></span>
                    </van-col>
                    <van-col span="14" class="overflow-l ml-5">
                        <div :class="genderColor(chat.user.gender)">{{chat.user.username}}</div>
                        <div class="bg-gray ft-12 pd-5" style="border-radius: 5px;">{{chat.msg}}</div>
                    </van-col>
                </van-row>

                <van-row type="flex" class="mb-10" justify="end" v-if="chat.is_self == 1">
                    <van-col span="14" class="overflow-l mr-5">
                        <div :class="genderColor(chat.user.gender)">{{chat.user.username}}</div>
                        <div class="bg-green ft-12 pd-5 color-fff" style="border-radius: 5px;">{{chat.msg}}</div>
                    </van-col>
                    <van-col span='4' class="relative" >
                        <van-image
                                class="avator"
                                :src="chat.user.avatar"
                        />
                        <span class="triangle-r"></span>
                    </van-col>
                </van-row>

                <van-row type="flex" justify="center" v-if="chat.is_self == 2">

                    <van-col span="20" class="color-red ft-12">{{chat.msg}}</van-col>
                </van-row>
            </div>

            <!--<van-row type="flex" class="mb-10">-->
                <!--<van-col span='4' class="relative" >-->
                    <!--<van-image-->
                        <!--class="avator"-->
                        <!--src="https://img.yzcdn.cn/vant/cat.jpeg"-->
                    <!--/>-->
                    <!--<span class="triangle-l"></span>-->
                <!--</van-col>-->
                <!--<van-col span="14" class="overflow-l ml-5">-->
                    <!--<div class="bg-gray ft-12 pd-5">这是一段最多显示一行的文字，多余的内容会被省略1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx8</div>-->
                <!--</van-col>-->
            <!--</van-row>-->

            <!--<van-row type="flex" class="mb-10" justify="end">-->
                <!--<van-col span="14" class="overflow-l mr-5">-->
                    <!--<div class="bg-green ft-12 pd-5 color-fff">这是一段最多显示一行的文字，多余的内容会被省略1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx8</div>-->
                <!--</van-col>-->
                <!--<van-col span='4' class="relative" >-->
                    <!--<van-image-->
                            <!--class="avator"-->
                            <!--src="https://img.yzcdn.cn/vant/cat.jpeg"-->
                    <!--/>-->
                    <!--<span class="triangle-r"></span>-->
                <!--</van-col>-->
            <!--</van-row>-->






        </div>
        <div class="mySendContent">
            <van-cell-group>
                <van-field v-model="content"  placeholder="请输入发送内容" @keyup.enter.native="sendMsg">
                    <template #button>
                        <van-button size="small" type="primary" @click="sendMsg" >发送</van-button>
                    </template>
                </van-field>

            </van-cell-group>
        </div>
    </div>

</template>
<script>
    import {roomInfo , outRoom, sendMsg} from '../../api/chat'

    export default {
        data() {
            return {
                title:'',
                group_count: 0,
                content: '',
                chatList: []
            }
        },
        computed: {
            //计算数据
        },
        mounted() {
            this.chat()
        },
        watch: {
          chatList() {
              // this.$nextTick(() => {
              //
              //     let list = document.getElementById('chatView')
              //     list.scrollTop = list.scrollHeight
              // })
              var scrollingElement = document.getElementById('chatView');

              console.log(document.getElementById('chatView').scrollHeight);
              // document.getElementById('chatView').scrollTop = document.getElementById('chatView').scrollHeight
              window.scrollTo(0,(scrollingElement.scrollHeight));
             
            
          }
        },
        methods: {
            chat() {
                roomInfo().then(res => {
                    this.group_count = res.data.group_count
                    this.title = res.data.user_room.room.name + ' 号房间('+this.group_count+')'
                })
                const that = this
                this.WS.ws.onmessage = function(msg) {
                    // console.log(msg)
                    var serverData = JSON.parse(msg.data)
                    if (serverData.type == 'message'){
                        console.log(serverData)
                        that.chatList.push(serverData);
                    }
                }
            },
            onOutRoom() {
                outRoom().then(res => {
                    if (res.code === 200){
                        this.$router.push('/main')
                    }
                })
            },
            sendMsg() {
                if (this.content == ''){
                    return false
                }
                sendMsg({msg:this.content}).then(res => {
                    if (res.code === 200){
                        this.content = ''
                    }
                })
            },
            genderColor(gender){
                if (gender == 0){
                    return 'female';
                } else {
                    return 'male';
                }
            }
        }
    }
</script>
<style>
    .mySendContent {
        margin-top: -50px;
        height: 50px;
        position:fixed;
        bottom:0;
        left: 0;
        width: 100%;
    }
    .van-cell.van-field{
        border-top: 1px solid #eee;
    }
    .chatView {
        padding-bottom: 50px;
        height: 100%;
        overflow-y: scroll;
    }
    .wrapper {
        box-sizing: border-box;
        min-height: 100%;
        padding-bottom: 50px;
    }
    .overflow-r{
        word-break:break-all;
        text-align:right;
        font-size: 14px;
    }
    .overflow-l{
        word-break:break-all;
        text-align:left;
        font-size: 14px;
    }
    .avator{
        border-radius: 4px;
        overflow: hidden;
        width: 45px;
        height: 45px;
    }
    .triangle-l{
        position: absolute;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 5px solid #eee;
        top:20px;
        left: 53px;
        z-index: 999;
    }
    .triangle-r{
        position: absolute;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid #07c160;
        top:20px;
        right: 54px;
        z-index: 999;
    }
    .relative{
        position: relative;
    }
    .flex{
        display: flex;
    }
    .flex-reverse{
        display: flex;
        flex-direction: row-reverse;
    }
    .alcenter{
        align-items: center;
    }
    .ml-5{
        margin-left: 5px;
    }
    .mr-5{
        margin-right: 5px;
    }
    .mb-10{
        margin-bottom: 10px;
    }
    .bg-gray{
        background-color: #eee;
    }
    .bg-green{
        background-color: #07c160;
    }
    .color-fff{
        color: #fff;
    }
    .color-red{
        color: red;
    }
    .ft-12{
        font-size: 12px;
    }
    .pd-5{
        padding: 5px;
    }
    .female{
        color: pink;
        padding: 5px;
    }
    .male {
        color: blue;
        padding: 5px;
    }
</style>