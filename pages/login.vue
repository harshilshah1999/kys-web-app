<template>
  <!--Login Page -->
  <v-container class="pa-0 ma-0" style="max-width: unset">
    <v-row style="height: 100vh" align="center" justify="center" no-gutters>
      <v-col cols="8" class="blue white--text fill-height hidden-md-and-down">
        <div class="center-vertically-horizontally pa-16">
          <div class="display-3 mb-5 font-weight-bold">
            Welcome to Kutch Yuvak Sangh Portal
          </div>
          <div class="title grey--text text--lighten-3 font-weight-light mb-5">
            A
            <span class="font-weight-medium"
              >Web Based Organization Management System
            </span>
            to get people together on a common platform to make them work
            towards a common predefined goal.
          </div>
          <v-btn
            class="ma-2"
            outlined
            color="white"
            large
            depressed
            style="width: fit-content"
            @click="$router.push('./details')"
          >
            Know More
            <v-icon right> mdi-arrow-right </v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col sm="12" xs="12" md="4" class="text-center blue-grey--text">
        <div
          class="display-1 hidden-lg-and-up mb-5 blue--text font-weight-bold pa-5"
        >
          Welcome to Kutch Yuvak Sangh Portal
        </div>
        <div class="subtitle-1 font-weight-medium mb-3">
          Please login with your authorized Google Account
        </div>
        <v-btn
          class="ma-2"
          outlined
          color="blue-grey darken-2"
          large
          depressed
          @click="login"
        >
          Login
          <v-icon right>mdi-google-assistant</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "no-style",
  methods: {
    login: function () {
      this.$auth
        .loginWith("google")
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.center-vertically-horizontally {
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
</style>