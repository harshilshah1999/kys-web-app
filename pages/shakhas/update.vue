<template>
  <!--error handling in unlink node -->
  <v-card>
    <v-card-title>
      Update Shakha
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
        shakhas.filter((val) =>
          !showDeleted ? val.row_state === 'alive' : true
        )
      "
      :search="search"
      :item-class="rowClass"
    >
      <template v-slot:item.actions="{ item }">
        <template v-if="item.row_state !== 'deleted'">
          <v-icon small class="mr-2" @click="editShakha(item)" color="primary">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteDialog(item)" color="red">
            mdi-delete
          </v-icon>
        </template>
        <template v-else> ---- </template>
      </template>
    </v-data-table>
    <!--Edit dialog-->
    <v-dialog v-model="dialogEdit" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-toolbar dark style="position: sticky; top: 0; z-index: 999">
        <v-toolbar-title>
          #{{ editedShakha.id + " - " + editedShakha.name }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialogEdit = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <shakhaForm
        type="Update"
        :shakha="{ ...editedShakha }"
        @updateShakha="updateDataTable"
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
          <v-btn color="blue darken-1" text @click="deleteShakha">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-checkbox
      v-model="showDeleted"
      label="Display deleted shaka(s)"
      class="ml-4"
    ></v-checkbox>
  </v-card>
</template>

<script>
import shakhaForm from "@/components/shakha/form";

export default {
  components: {
    shakhaForm,
  },
  data() {
    return {
      showDeleted: false,
      editedShakha: {},
      deletedShakha: {},
      dialogEdit: false,
      dialogDelete: false,
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "State", value: "state" },
        { text: "Location", value: "location" },
        { text: "Pin Code", value: "pin_code" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      shakhas: [],
    };
  },
  mounted() {
    this.$axios
      .get("/api/getAllShakhas")
      .then((res) => {
        this.shakhas = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    updateDataTable: function ($event) {
      this.shakhas = this.shakhas.map((shakha) =>
        shakha.id === $event.id ? { ...$event } : shakha
      );
      this.dialogEdit = false;
    },
    editShakha: function (shakha) {
      this.dialogEdit = true;
      this.editedShakha = shakha;
    },
    openDeleteDialog: function (shakha) {
      this.dialogDelete = true;
      this.deletedShakha = shakha;
    },
    deleteShakha: function () {
      this.$axios
        .post("/api/updateShakha", {
          ...this.deletedShakha,
          row_state: "deleted",
        })
        .then((res) => {
          this.shakhas = this.shakhas.map((shakha) =>
            shakha.id === res.data.id ? { ...res.data } : shakha
          );
          this.deletedVolunteer = {};
          this.dialogDelete = false;
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    rowClass: function (shakha) {
      if (shakha.row_state === "deleted")
        return ["red", "disabled", "grey--text text--lighten-4"];
    },
  },
};
</script>

<style>
</style>