<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline"> User Info </v-card-title>

      <v-card-text>
        <v-avatar>
          <v-img :src="$auth.user.picture"></v-img>
        </v-avatar>
        <br />
        Email : {{ $auth.user.email }}
        <br />
        Name : {{ $auth.user.name }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="imperial-red" text @click="logout()"> Logout </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    logout: function () {
      this.$auth.logout();
      this.dialog = false;
      this.$router.push("/login");
    },
  },
  mounted() {
    this.$root.$on("openusermodal", () => {
      this.dialog = true;
    });
  },
};
</script>

<style>
</style>