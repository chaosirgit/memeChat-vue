<template>
    <div style="height: 50%;margin-top: 50px">
        <van-row type="flex" justify="center" align="center">

            <van-col span="6">Register</van-col>

        </van-row>
        <div class="box" style="margin-top: 5.8rem">
            <van-form @submit="onSubmit" style="width: 80%">
                <van-field
                        v-model="username"
                        name="username"
                        label="Username"
                        placeholder="Please input your username"
                        :rules="[{ required: true, message: 'Please input your username' }]"
                />
                <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Please input your password"
                        :rules="[{ required: true, message: 'Please input your password' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        Register
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>
<script>
    import { register } from "../../api/register";

    export default {
        name: 'Register', //组件名称
        data() {
            return {
                username:'',
                password: ''
            }
        },
        computed: {
            //计算数据
        },
        mounted() {

        },
        methods: {
            onSubmit() {
                register({username:this.username,password:this.password}).then(res => {
                    console.log(res)
                    if (res.code === 200){
                        this.$router.push('/login')
                    }
                },error => {
                    console.log(error)
                })
            }
        }
    }
</script>


<style>
    .box {
        display: flex;
        flex-flow:column;
        justify-content: center;
        height: 100%;
        align-items: center;
    }
</style>