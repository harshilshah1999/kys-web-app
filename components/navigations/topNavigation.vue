<template>
  <v-app-bar color="prussian-blue" dark app>
    <v-app-bar-nav-icon
      @click="$root.$emit('togglesidenav')"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="text-capitalize">{{
      $auth.user.name
    }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <userModal />
    <v-avatar @click="$root.$emit('openusermodal')" style="cursor: pointer">
      <v-img :src="$auth.user.picture"></v-img>
    </v-avatar>
  </v-app-bar>
</template>

<script>
import userModal from "./userModal";

export default {
  components: {
    userModal,
  },
};
</script>

<style>
</style>