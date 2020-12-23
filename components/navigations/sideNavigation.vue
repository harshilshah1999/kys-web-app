<template>
  <v-navigation-drawer
    app
    v-model="sideNav"
    :mini-variant="mini"
    color="honeydew"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> KYS </v-list-item-title>
        <v-list-item-subtitle> Web App </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="px-2">
      <v-btn icon @click.stop="mini = !mini">
        <v-icon v-if="mini === true">mdi-chevron-right</v-icon>
        <v-icon v-else>mdi-chevron-left</v-icon>
      </v-btn>
      <v-list-item-avatar>
        <v-img :src="$auth.user.picture"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>&nbsp; {{ $auth.user.name }}</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        :prepend-icon="item.icon"
        v-model="item.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="child in childItems.filter((val) => val.parent === item.title)"
          :key="child.title"
          link
          :to="child.link"
        >
          <v-list-item-icon>
            <v-icon x-small> mdi-circle-slice-8</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Volunteers", icon: "mdi-account-group" },
        { title: "User Roles", icon: "mdi-account-edit-outline" },
        { title: "Event", icon: "mdi-calendar" },
        { title: "Social Media", icon: "mdi-earth" },
        { title: "Shakha", icon: "mdi-source-branch" },
        { title: "Blood Donation", icon: "mdi-blood-bag" },
        { title: "Blood Fulfillment", icon: "mdi-heart-flash" },
      ],
      childItems: [
        { title: "Create", link: "/volunteers/create", parent: "Volunteers" },
        { title: "Update", link: "/volunteers/update", parent: "Volunteers" },
        { title: "Create", link: "/shakhas/create", parent: "Shakha" },
        { title: "Update", link: "/shakhas/update", parent: "Shakha" },
        { title: "Create", link: "/events/create", parent: "Event" },
        { title: "Update", link: "/events/update", parent: "Event" },
      ],
      sideNav: null,
      mini: null,
    };
  },
  mounted() {
    this.$root.$on("togglesidenav", () => (this.sideNav = !this.sideNav));
  },
};
</script>

<style>
</style>