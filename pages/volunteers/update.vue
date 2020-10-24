<template>
  <!-- todo - dynamic loading for avatar and expanded picture, remove direct mutation of props, error handling in unlink node -->
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
      :items="
        volunteers.filter((val) =>
          !showDeleted ? val.row_state === 'alive' : true
        )
      "
      :search="search"
      :item-class="rowClass"
      show-expand
    >
      <template v-slot:item.first_name="{ item }">
        <v-avatar size="25">
          <v-img :src="'/volunteer_profile/' + item.profile_picture_path" eager>
          </v-img>
        </v-avatar>
        &nbsp;{{ item.first_name }} {{ item.last_name }}
      </template>
      <template v-slot:item.actions="{ item }">
        <template v-if="item.row_state !== 'deleted'">
          <v-icon
            small
            class="mr-2"
            @click="editVolunteer(item)"
            color="primary"
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteDialog(item)" color="red">
            mdi-delete
          </v-icon>
        </template>
        <template v-else> ---- </template>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="grey lighten-4">
          <expandedDetails :details="item" />
        </td>
      </template>
    </v-data-table>
    <!--Edit dialog-->
    <v-dialog v-model="dialogEdit" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-toolbar dark style="position: sticky; top: 0; z-index: 999">
        <v-toolbar-title>
          #{{
            editedVolunteer.id +
            " - " +
            editedVolunteer.first_name +
            " " +
            editedVolunteer.last_name
          }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialogEdit = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <volunteerForm type="Update" :volunteer="editedVolunteer" />
    </v-dialog>
    <!--Delete dialog-->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title>Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteVolunteer">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-checkbox
      v-model="showDeleted"
      label="Display deleted volunteers"
      class="ml-4"
    ></v-checkbox>
  </v-card>
</template>

<script>
import volunteerForm from "@/components/volunteer/form";
import expandedDetails from "@/components/volunteer/expandedDetails";

export default {
  components: {
    volunteerForm,
    expandedDetails,
  },
  data() {
    return {
      showDeleted: false,
      editedVolunteer: {},
      deletedVolunteer: {},
      dialogEdit: false,
      dialogDelete: false,
      search: "",
      headers: [
        { text: "Profile", value: "first_name" },
        { text: "Phone Number", value: "phone_number" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      volunteers: [],
    };
  },
  mounted() {
    this.$axios
      .get("/api/getAllVolunteers")
      .then((res) => {
        this.volunteers = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    editVolunteer: function (volunteer) {
      this.dialogEdit = true;
      this.editedVolunteer = volunteer;
    },
    openDeleteDialog: function (volunteer) {
      this.dialogDelete = true;
      this.deletedVolunteer = volunteer;
    },
    deleteVolunteer: function () {
      this.$axios
        .post("/api/updateVolunteerState", {
          row_state: "deleted",
          id: this.deletedVolunteer.id,
          updatedBy: this.$auth.user.email,
        })
        .then((res) => {
          this.volunteers = this.volunteers.map((volunteer) =>
            volunteer.id === res.data.id ? { ...res.data } : volunteer
          );
          console.log(this.volunteers);
          this.deletedVolunteer = {};
          this.dialogDelete = false;
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    rowClass: function (volunteer) {
      if (volunteer.row_state === "deleted")
        return ["red", "disabled", "grey--text text--lighten-4"];
    },
  },
};
</script>

<style>
</style>