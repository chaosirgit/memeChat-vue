<template>
    <layout>
        <div slot="nav-bar"></div>
        <main slot="main">
            <div class="myMain">
                <div style="display: block">在线人数: {{online_count}}</div>
                <van-button round color="linear-gradient(to right, #43cbff, #970bcc)" size="normal" @click="showCreateRoom" style="margin-top: 20px;">
                    创建 & 加入房间
                </van-button>
            </div>
            <van-dialog v-model="createRoomView" title="输入房间名称" show-cancel-button @confirm="createRoom">
                输入房间名称创建或进入房间
                <van-cell-group>
                    <van-field v-model="roomName" label="房间名称" type="number" placeholder="请输入房间名称" />
                </van-cell-group>
            </van-dialog>
        </main>

    </layout>

</template>
<script>
    import { index, bindSocket, createRoom } from "../../api/index";
    import Layout from '../../components/Layout';
    import baseConfig from '../../config.js';
    import { Toast } from 'vant';

    export default {
        name: 'Index', //组件名称
        components: {
            Layout
        } ,
        data() {
            return {
                client_id : '',
                is_online : false,
                online_count: 0,
                createRoomView: false,
                roomName: ''
            }
        },
        computed: {
            //计算数据
        },
        mounted() {
            this.index()
        },
        methods: {
            index() {
                index().then(res => {
                    console.log(res)
                    this.is_online = res.data.is_online
                    this.online_count = res.data.online_count
                    if (res.data.is_online === false){
                        var that = this
                        this.WS.setWs(new WebSocket(baseConfig.wsServer));
                        this.WS.ws.onmessage = function(msg) {
                            // console.log(msg)
                            var serverData = JSON.parse(msg.data)
                            if (serverData.type == 'init'){
                                that.client_id = serverData.client_id
                                that.myBindSocket()
                            }
                        }
                    }
                })
            },
            showCreateRoom() {
                this.roomName = '';
                this.createRoomView = true;
            },
            createRoom() {
                createRoom({name:parseInt(this.roomName)}).then(res => {
                    if (res.code === 200){
                        this.createRoomView = false;
                        this.$router.push('/chat')
                    }
                })
            },
            myBindSocket() {
                bindSocket({client_id:this.client_id}).then(res => {
                    this.online_count = res.data.online_count
                    if (res.code != 200){
                        Toast.fail('服务器连接错误.请重试');
                    }
                })
            }
        }
    }
</script>
<style>
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
    .none {

    }
    .chinese-to-english {
        background-image: linear-gradient(to right, #81fbb8, #28c76f);
    }
    .word {
        background-image: linear-gradient(to right, #fad7a1, #e96d71);
    }
    .image-to-word {
        background-image: linear-gradient(to right, #43cbff, #970bcc);
    }
    .myMain {
        display: flex;
        align-items: center;
        justify-content: center;
        height:600px;
        flex-direction: column;
    }
</style>