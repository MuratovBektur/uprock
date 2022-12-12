<template>
  <div class="login">
    <h1 class="login__title">Sign In</h1>
    <u-input label="Email" v-model="form.email" />
    <u-input label="Password" type="password" v-model="form.password" />
    <div class="login__error-msg" v-if="errorMsg">{{ errorMsg }}</div>
    <div class="login__error-msg_empty" v-else>{{ errorMsg }}</div>
    <u-btn :loading="isValidatingForm" @click="validateForm">Sign In</u-btn>
  </div>
</template>

<script>
import UInput from "@/components/u-input.vue";
import UBtn from "@/components/u-btn.vue";
import api from "@/libs/axios";
const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  components: {
    UInput,
    UBtn,
  },
  data() {
    return {
      isValidatingForm: false,
      errorMsg: "",
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async validateForm() {
      try {
        this.isValidatingForm = true;
        // ставим хотя бы 1 сек лоадинг бар для красоты
        const [res] = await Promise.all([
          api.post("/login", this.form),
          sleep(1000),
        ]);
        console.log("res", res);
        const token = res.data.token;
        localStorage.setItem("token", token);
        this.$router.push("/dashboard");
      } catch (err) {
        console.error(err);
        this.errorMsg =
          err?.response?.data?.message || "An unexpected error has occurred";
      } finally {
        this.isValidatingForm = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$errorMsgMinHeight: 30px;
.login {
  min-width: 300px;
  max-width: 500px;
  width: 30vw;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding: 20px 0;

  &__title {
    font-size: 20px;
  }
  &__error-msg {
    min-height: $errorMsgMinHeight;
    color: tomato;
    font-size: 15px;
    max-width: 250px;
    &_empty {
      min-height: $errorMsgMinHeight;
    }
  }
  & > * {
    margin: 10px 0;
    min-width: 200px;
  }
}
</style>
