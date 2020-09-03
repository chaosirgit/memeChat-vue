<template>
    <layout>
        <main slot="main">
            <van-row type="flex" justify="center">
                <van-col span="20">
                    <van-field v-if="id !== '3'" label="Question" :value="userQuestion.questions.question" readonly />
                    <van-image v-else width="100" height="100" :src="userQuestion.questions.question" />
                </van-col>
            </van-row>

            <van-row type="flex" justify="center" style="margin-top: 20px">
                <van-col span="20">
                    <van-field label="Answer" v-model="answer" @keyup.enter="postAnswer"/>
                </van-col>
            </van-row>
            <van-row type="flex" justify="end" style="margin-top: 20px">
                <van-col span="10">
                    <van-button round color="linear-gradient(to right, #65799b, #5e2563)" size="mini" @click="showMeTheCorrect">Show Correct</van-button>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center" style="margin-top: 20px">
                <van-col span="20">
                    <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)" size="large" @click="postAnswer">
                        Submit & Next
                    </van-button>
                </van-col>
            </van-row>

            <!-- 自定义图标 -->
            <van-popup
                    v-model="show"
                    closeable
                    close-icon="close"
                    position="bottom"
                    :style="{ height: '30%' }"
                    class="myCenter"
            >
                <div>
                    {{ correctAnswer }}
                </div>

            </van-popup>
        </main>
    </layout>
</template>
<script>
    import Layout from '../../components/Layout';
    import { question,answer,correct } from "../../api/question";
    import { Toast } from 'vant';

    export default {
        name: 'Question', //组件名称
        components: {
            Layout
        } ,
        data() {
            return {
                id: this.$route.query.id,
                userQuestion: {
                    questions: {
                        id: 0,
                        question: ''
                    }
                },
                answer: '',
                show: false,
                correctAnswer: ''
            }
        },
        computed: {
            //计算数据
        },
        mounted() {
            console.log(typeof this.id)
            console.log(this.id === '3')
            this.getQuestion()
        },
        methods: {
            getQuestion() {
                console.log(this.id)
                question({id:this.id}).then(res => {
                    this.userQuestion = res.data
                })
            },
            postAnswer(){
                answer({id:this.userQuestion.id,answer:this.answer}).then(res => {
                    console.log(res);
                    if (res.code === 200){
                        let second = 2
                        if (res.data.is_right === 1){
                            const toast = Toast({
                                message: res.data.msg + '\n' + `wait 2 second`,
                                icon: 'good-job',
                            });
                            const timer = setInterval(() => {
                                second--;
                                if (second) {
                                    toast.message = res.data.msg + '\n' + `wait ${second} second`
                                }else{
                                    clearInterval(timer);
                                    // 手动清除 Toast
                                    Toast.clear();
                                    this.getQuestion()
                                }
                            }, 1000);
                        }else{
                            const toast = Toast({
                                duration: 0, // 持续展示 toast
                                message: res.data.msg + '\n' + `wait 2 second`,
                                icon: 'clear',
                            });
                            const timer = setInterval(() => {
                                second--;
                                if (second) {
                                    toast.message = res.data.msg + '\n' + `wait ${second} second`
                                }else{
                                    clearInterval(timer);
                                    // 手动清除 Toast
                                    Toast.clear();
                                    this.getQuestion()
                                }
                            }, 1000);

                        }
                        this.answer = ''
                    } else {
                        this.$router.back()
                    }


                })
            },
            showMeTheCorrect() {
                correct({id:this.userQuestion.questions.id}).then(res => {
                    if (res.code === 200){
                        this.correctAnswer = res.data
                        this.show = true
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
    .myCenter {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>