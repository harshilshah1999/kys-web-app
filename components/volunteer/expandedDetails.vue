<template>
  <v-card
    class="mx-auto my-4"
    :max-width="$vuetify.breakpoint.xs ? '250' : '400'"
  >
    <v-img
      contain
      :src="'/volunteer_profile/' + details.profile_picture_path"
      class="white--text align-end ma-auto"
      max-height="250"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      eager
    >
      <v-spacer></v-spacer>
      <v-card-title>
        <v-icon class="white--text text-darken-2 mr-2" medium>
          mdi-account-details
        </v-icon>
        More Details
      </v-card-title>
    </v-img>
    <v-card-text class="center-align">
      Name: {{ details.first_name }} {{ details.middle_name }}
      {{ details.last_name }} <br />
      Date of Birth: {{ formatDate(details.date_of_birth) }} <br />Blood Group:
      {{ details.blood_group }} <br />Registration Date:
      {{ formatDate(details.registration_date) }} <br />Expiration Date:
      {{ formatDate(details.expiration_date) }} <br />Gender:
      {{ details.gender }} <br />Address: {{ details.address }} <br />Pin Code:
      {{ details.pin_code }} <br />Occupation: {{ details.occupation }}
      <br />Education: {{ details.education }} <br />Native Place:
      {{ details.native_place }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon :href="'tel:+91' + details.phone_number">
        <v-icon>mdi-phone-in-talk</v-icon>
      </v-btn>

      <v-btn icon :href="'mailto:' + details.email" target="_blank">
        <v-icon>mdi-email</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { formatDate } from "~/utils/utils";

export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style>
</style>