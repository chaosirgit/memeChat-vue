<template>
    <layout>
        <main slot="main">
            <van-tabs v-model="active" @click="onClick">
                <van-tab title="Wrong" />
                <van-tab title="Right" />
                <van-tab title="No Answer" />
            </van-tabs>
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh" loosing-text="Open...">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="No more"
                        loading-text="Loading..."
                        @load="onLoad"
                        class="myGroup"
                >
                    <van-cell-group v-for="item in list" :key="item.id" border>
                        <template #title>
                            <van-icon name="question" color="#187ef9" />
                            {{item.questions.question}}
                        </template>
                        <van-cell title="Your answer" :value="item.user_answer" />
                        <van-cell title="Right or Wrong" :value="item.is_right === 1 ? 'Right' : item.is_right === 2 ? 'Wrong' : 'Not Answer'"
                        :value-class="item.is_right === 1 ? 'right' : item.is_right === 2 ? 'wrong' : ''"/>
                        <van-cell title="Use time" :value="item.use_time+ ' s'" />
                    </van-cell-group>
                </van-list>
            </van-pull-refresh>
        </main>
    </layout>
</template>
<script>
    import Layout from '../../components/Layout'
    import { myQuestion } from "../../api/myQuestion";

    export default {
        name: 'Login', //组件名称
        components: { Layout },
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                active:0,
                categoryId:this.$route.query.categoryId,
                page:1
            }
        },
        computed: {
            //计算数据
            is_right (){
                return this.active === 0 ? 2 : this.active === 1 ? 1 : 0
            }
        },
        mounted() {
            // this.onLoad()
        },
        methods: {
            onLoad() {
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }
                myQuestion({category_id:this.categoryId,page:this.page,is_right:this.is_right}).then(res => {
                    res.data.data.map(item => {
                        this.list.push(item)
                    })
                    console.log(this.list);
                    this.page++
                    // 加载状态结束
                    this.loading = false;
                    console.log(this.list.length,res.data.total)
                    // 数据全部加载完成
                    if (this.list.length >= res.data.total) {
                        console.log('finished');
                        this.finished = true;
                    }
                })
            },
            onRefresh() {
                // 清空列表数据
                this.page = 1;
                this.finished = false;
                this.refreshing = true;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            },
            onClick() {
                this.onRefresh();
                // this.onLoad()
            }
        }
    }


</script>
<style>
.myGroup {text-align: left;}
.van-cell-group__title {}
</style>