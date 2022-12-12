const state = {
  userInfo: null,
};
const actions = {
  async setUserInfo({ commit }, userInfo) {
    commit("SET_USER_INFO", userInfo);
  },
};
const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
