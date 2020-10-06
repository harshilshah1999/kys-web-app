<template>
  <v-app>
    <topNavigation />
    <sideNavigation />
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import topNavigation from "../components/navigations/topNavigation";
import sideNavigation from "../components/navigations/sideNavigation";

export default {
  components: {
    topNavigation,
    sideNavigation,
  },
};
</script>

<style>
</style>