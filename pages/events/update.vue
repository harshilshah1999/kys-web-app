<template>
  <v-card>
    <v-card-title>
      Update Event
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
        events.filter((val) =>
          !showDeleted ? val.row_state === 'alive' : val.state != 'closed'
        )
      "
      :search="search"
      :item-class="rowClass"
      show-expand
    >
      <template v-slot:item.start_time="{ item }">
        {{ item.start_time.toString().substr(0, 21) }} to
        {{ item.end_time.toString().substr(0, 21) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <template v-if="item.row_state !== 'deleted'">
          <v-icon small class="mr-2" @click="editEvent(item)" color="primary">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteDialog(item)" color="red">
            mdi-delete
          </v-icon>
          &nbsp;
          <v-icon small @click="openCloseEventDialog(item)" color="green">
            mdi-lock-check
          </v-icon>
        </template>
        <template v-else> ---- </template>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="grey lighten-4">
          {{ item }}
        </td>
      </template>
    </v-data-table>
    <!--Edit dialog-->
    <v-dialog v-model="dialogEdit" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-toolbar dark style="position: sticky; top: 0; z-index: 999">
        <v-toolbar-title>
          #{{ editedEvent.id + " - " + editedEvent.name }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialogEdit = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <eventForm
        type="Update"
        :event="{ ...editedEvent }"
        @updateEvent="updateDataTable"
      />
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
          <v-btn color="blue darken-1" text @click="deleteEvent">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Close event dialog-->
    <v-dialog v-model="dialogCloseEvent" max-width="500px">
      <v-card>
        <v-card-title>Are you sure you want to close this event?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogCloseEvent = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="closeEvent">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-checkbox
      v-model="showDeleted"
      label="Display deleted event(s)"
      class="ml-4"
    ></v-checkbox>
  </v-card>
</template>

<script>
import eventForm from "@/components/event/form";

export default {
  components: {
    eventForm,
  },
  data() {
    return {
      showDeleted: false,
      editedEvent: {},
      deletedEvent: {},
      dialogEdit: false,
      dialogDelete: false,
      dialogCloseEvent: false,
      closedEvent: {},
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Date", value: "start_time" },
        { text: "Venue", value: "venue" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      events: [],
      shakhas: [],
    };
  },
  mounted() {
    this.$axios
      .get("/api/getAllEvents")
      .then((res) => {
        for (let data in res.data) {
          res.data[data].start_time = new Date(res.data[data].start_time);
          res.data[data].end_time = new Date(res.data[data].end_time);
        }
        this.events = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("/api/getAllShakhas")
      .then((res) => (this.shakhas = res.data))
      .catch((err) => console.log(err));
  },
  methods: {
    updateDataTable: function ($event) {
      this.events = this.events.map((event) =>
        event.id === $event.id ? { ...$event } : event
      );
      this.dialogEdit = false;
    },
    editEvent: function (event) {
      this.dialogEdit = true;
      this.editedEvent = { ...event };
      this.editedEvent.shakha_id = this.shakhas.find(
        (shakha) => shakha.id == event.shakha_id
      );
    },
    openDeleteDialog: function (event) {
      this.dialogDelete = true;
      this.deletedEvent = event;
    },
    openCloseEventDialog: function (event) {
      this.dialogCloseEvent = true;
      this.closedEvent = event;
    },

    deleteEvent: function () {
      this.$axios
        .post("/api/updateEvent", {
          ...this.deletedEvent,
          row_state: "deleted",
        })
        .then((res) => {
          this.events = this.events.map((event) =>
            event.id === res.data.id ? { ...res.data } : event
          );
          this.deletedEvent = {};
          this.dialogDelete = false;
        })
        .catch((err) => console.log(err));
    },
    closeEvent: function () {
      this.$axios
        .post("/api/updateEvent", {
          ...this.closedEvent,
          state: "closed",
          row_state: "deleted",
        })
        .then((res) => {
          this.events = this.events.map((event) =>
            event.id === res.data.id ? { ...res.data } : event
          );
          this.closedEvent = {};
          this.dialogCloseEvent = false;
        })
        .catch((err) => console.log(err));
    },
    rowClass: function (event) {
      if (event.row_state === "deleted")
        return ["red", "disabled", "grey--text text--lighten-4"];
    },
  },
};
</script>

<style>
</style>