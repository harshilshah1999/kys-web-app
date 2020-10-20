<template>
  <v-card>
    <v-card-title>
      Update Volunteer
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        outlined
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="volunteers"
      :search="search"
    ></v-data-table>
    <!-- <img src="/volunteer_profile/1603122654015_sample-profile-picture1.png" /> -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Name", value: "first_name" },
        { text: "Phone Number", value: "phone_number" },
        { text: "Email", value: "email" },
        { text: "Address", value: "address" },
        { text: "Date of birth", value: "date_of_birth" },
        { text: "Blood group", value: "blood_group" },
        { text: "Registration Date", value: "registration_date" },
        { text: "Expiration Date", value: "expiration_date" },
      ],
      volunteers: [],
    };
  },
  mounted() {
    this.$axios
      .get("/api/getAllVolunteers")
      .then((res) => {
        console.log(res.data);
        this.volunteers = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>