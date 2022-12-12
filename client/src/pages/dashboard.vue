<template>
  <div class="dashboard">
    <h1 class="dashboard__title">UserInfo</h1>
    <div v-if="isFetchingUserInfo"></div>
    <table v-else-if="userInfo" border="1" class="dashboard__table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Birthday</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ userInfo.email }}</td>
          <td>{{ userInfo.name }}</td>
          <td>{{ userInfo.birthday }}</td>
        </tr>
      </tbody>
    </table>
    <u-btn class="dashboard__btn" @click="goToLoginPage" :background="'red'">
      Exit
    </u-btn>
  </div>
</template>

<script>
import api from "@/libs/axios";
import uBtn from "../components/u-btn.vue";
export default {
  components: { uBtn },
  data() {
    return {
      isFetchingUserInfo: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.auth.userInfo;
    },
  },
  created() {
    if (!this.userInfo) {
      this.fetchUserInfo();
    }
  },
  methods: {
    async fetchUserInfo() {
      try {
        this.isFetchingUserInfo = true;
        const token = localStorage.getItem("token");
        if (!token) {
          this.goToLoginPage();
        }
        const res = await api.get("/userinfo");
        this.$store.dispatch("auth/setUserInfo", res.data);
      } catch (e) {
        this.goToLoginPage();
      } finally {
        this.isFetchingUserInfo = false;
      }
    },
    goToLoginPage() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
  background-color: #fff;
  &__title {
    font-size: 20px;
  }
  &__table {
    & td,
    & th {
      padding: 5px;
    }
  }
  & > * {
    margin: 10px 0;
    min-width: 200px;
  }
  &__btn {
    margin: 10px auto !important;
  }
}
</style>
