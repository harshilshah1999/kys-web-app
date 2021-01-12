<template>
  <div>
    <v-app-bar color="red accent-3" dark fixed hide-on-scroll>
      <v-toolbar-title>Kutch Yuvak Sangh </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu offset-y :close-on-content-click="false" open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="transparent" dark v-bind="attrs" v-on="on">
              About Us
            </v-btn>
          </template>
          <v-list>
            <v-list-item link to="/about-us/overview">
              <v-list-item-icon>
                <v-icon>mdi-book-information-variant</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Overview</v-list-item-title>
            </v-list-item>

            <v-list-group
              v-for="item in aboutUs"
              :key="item.title"
              v-model="item.active"
              :prepend-icon="item.action"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="child in item.items"
                :key="child.title"
                link
                :to="'/about-us/' + child.to"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="child.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item link to="/about-us/overview">
              <v-list-item-icon>
                <v-icon>mdi-pillar</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Shakhas</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/about-us/shakhas">
              <v-list-item-icon>
                <v-icon>mdi-account-supervisor-circle-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Our Partners</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/about-us/partners">
              <v-list-item-icon>
                <v-icon>mdi-camera-image</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Gallery</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/about-us/overview">
              <v-list-item-icon>
                <v-icon>mdi-checkbox-intermediate</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Media</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y :close-on-content-click="false" open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="transparent" dark v-bind="attrs" v-on="on">
              What we Do
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in whatWeDo"
              link
              :to="item.to"
              :key="item.title"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y :close-on-content-click="false" open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="transparent" dark v-bind="attrs" v-on="on">
              Events
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in events"
              link
              :to="item.to"
              :key="item.title"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn color="transparent" dark to="/testimonials">
          Testimonials
        </v-btn>
        <v-btn color="transparent" dark to="/contact-us"> Contact Us </v-btn>
        <v-menu offset-y :close-on-content-click="false" open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="transparent" dark v-bind="attrs" v-on="on">
              Get Involved
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in getInvolved"
              link
              :to="item.to"
              :key="item.title"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    aboutUs: [
      {
        action: "mdi-account-group-outline",
        items: [
          { title: "Founders", to: "/founders" },
          { title: "Trustees", to: "/trustees" },
          { title: "Core Team", to: "/core-team" },
        ],
        title: "Our Team",
      },
    ],
    whatWeDo: [
      {
        title: "Blood Donation Camps",
        to: "/what-we-do/blood-donation-camps",
        icon: "mdi-blood-bag",
      },
      {
        title: "Organ Donation Awareness",
        to: "/what-we-do/organ-donation-awareness",
        icon: "mdi-speaker-wireless",
      },
      {
        title: "Educational",
        to: "/what-we-do/educational",
        icon: "mdi-cast-education",
      },
      {
        title: "Cultural",
        to: "/what-we-do/cultural",
        icon: "mdi-drama-masks",
      },
    ],
    events: [
      {
        title: "Upcoming Events",
        to: "/events/upcoming-events",
        icon: "mdi-calendar-clock",
      },
      {
        title: "Past Events",
        to: "/events/past-events",
        icon: "mdi-calendar-check",
      },
    ],
    getInvolved: [
      {
        title: "Be a Blood Donor",
        to: "/get-involved/be-a-blood-donor",
        icon: "mdi-hand-heart",
      },
      {
        title: "Be a Volunteer",
        to: "/get-involved/be-a-volunteer",
        icon: "mdi-human-greeting",
      },
      {
        title: "Organize Blood Camp",
        to: "/get-involved/organize-blood-camp",
        icon: "mdi-account-multiple-plus-outline",
      },
      {
        title: "Donation",
        to: "/get-involved/donation",
        icon: "mdi-charity",
      },
    ],
  }),
};
</script>

<style>
</style>