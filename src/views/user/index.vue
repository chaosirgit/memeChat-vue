<template>
    <layout>
        <main slot="main">
            <van-row type="flex" justify="center">

                <van-col span="20" style="height: 120px">
                    <van-row style="align-items:center;justify-content:center;">
                        <van-col span="8">
                            <van-uploader :after-read="afterRead" :max-size="2 * 1024 * 1024" @oversize="onOversize">
                                <van-image
                                        round
                                        :src="user.avatar"
                                        class="shadow"
                                        style="width: 100px;height: 100px"
                                >
                                </van-image>
                            </van-uploader>

                        </van-col>
                        <van-col span="2">

                        </van-col>
                        <van-col span="12">
                            {{ user.username || 'Please set your nickname' }}
                            <hr>
                            {{ user.created_at }}
                        </van-col>
                    </van-row>

                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col span="20">
                    <van-grid clickable :column-num="1">
                        <!--<van-grid-item icon="setting" text="Set Nickname" @click="setNickname" />-->
                        <!--<van-grid-item icon="lock" text="Change Password" @click="changePassword" />-->
                        <!--<van-grid-item icon="column" text="My Question" @click="myQuestion(1)" />-->
                    </van-grid>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center" style="margin-top: 10px">
                <van-col span="20">
                    <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" size="large" @click="logOut">
                        退出登录
                    </van-button>
                </van-col>
            </van-row>



            <van-dialog v-model="show" title="Set Nickname" show-cancel-button @confirm="postNickname" @cancel="cancelNickname" confirm-button-text="confirm" cancel-button-text="cancel">
                <van-cell-group>
                    <van-field v-model="nickname" label="Nickname" placeholder="please set your nickname" />
                </van-cell-group>
            </van-dialog>
            <van-dialog v-model="passwordShow" title="Change Password" show-cancel-button @confirm="postPassword" @cancel="cancelPassword" confirm-button-text="confirm" cancel-button-text="cancel">
                <van-cell-group>
                    <van-field v-model="password" label="Old Password" placeholder="please input your old password" />
                    <van-field v-model="newPass" label="New Password" placeholder="please input your new password" />
                    <van-field v-model="newPassword" label="Confirm Password" placeholder="please input your new password again" />
                </van-cell-group>
            </van-dialog>
        </main>
    </layout>


</template>
<script>
    import { user,changeSomething,logOut } from "../../api/user";
    import Layout from '../../components/Layout';
    import { Toast } from 'vant';
    import { upload } from "../../api/index";

    export default {
        name: 'User', //组件名称
        components: {
            Layout
        } ,
        data() {
            return {
                user:{},
                show: false,
                passwordShow: false,
                nickname: '',
                password: '',
                newPass: '',
                newPassword: ''
            }
        },
        computed: {
            //计算数据
        },
        mounted() {
            this.getUser()
        },
        methods: {
            getUser() {
                user().then(res => {
                    this.user = res.data
                })
            },
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
                upload({avatar:file.content}).then(res => {
                    if (res.code === 200){
                        this.user = res.data
                    }
                })
            },
            onOversize() {
                Toast('The file size must be not > 2M');
            },
            setNickname() {
                this.show = true
                this.nickname = this.user.nickname
            },
            cancelNickname() {
                this.show = false
            },
            postNickname() {
                changeSomething({nickname:this.nickname}).then(res => {
                    if (res.code === 200){
                        this.show = false
                        this.user = res.data
                    }
                })
            },
            changePassword() {
                this.passwordShow = true
            },
            cancelPassword() {
                this.password = ''
                this.newPass = ''
                this.newPassword = ''
                this.passwordShow = false
            },
            postPassword() {
                if (this.newPass !== this.newPassword) {
                    Toast('New password don\'t consistent');
                    return false
                } else {
                    changeSomething({password:this.password,newPassword:this.newPassword}).then(res => {
                        if (res.code === 200){
                            this.show = false
                        }
                    })
                }

            },
            logOut() {
                logOut().then(res => {
                    if (res.code === 200){
                        this.$router.push('/login')
                    }
                })
            },
            myQuestion(categoryId) {
                this.$router.push({path:'/myQuestion',query:{categoryId:categoryId}})
            }
        }
    }
</script>
<style>
    .box-avatar {
        display: flex;
        flex-flow:column;
        justify-content: center;
        height: 100%;
        /*align-items: center;*/
    }
</style>