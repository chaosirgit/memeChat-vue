<template>
  <!-- 居中 -->
  <div style="height: 50%;margin-top: 50px">
    <van-row type="flex" justify="center" align="center">
      <van-col span="6">魔音-隐私聊天室</van-col>
    </van-row>
    <div class="box" style="margin-top: 5.8rem">
      <van-form  style="width: 80%">
        <van-field
          v-model="username"
          name="username"
          label="昵称"
          placeholder="聊天室中显示的昵称"
          :rules="[{ required: true, message: '请输入您在聊天室中显示的昵称' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <van-field name="radio" label="性别">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="0">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button
            round
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            size="large"
            @click="onSubmit"
          >登录 & 注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { login } from "../../api/login";

export default {
  name: "Login", //组件名称
  data() {
    return {
      username: "",
      password: "",
      radio: 1
    };
  },
  computed: {
    //计算数据
  },
  mounted() {},
  methods: {
    onSubmit() {
      login({ username: this.username, password: this.password, gender:this.radio }).then(res => {
        if (res.code === 200) {
          this.$router.push("/");
        }
      });
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>

<style>
.box {
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;
  align-items: center;
}
</style>