<template>
  <v-card elevation="2" outlined>
    <v-card-title>{{ type }} an Event</v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <validation-observer ref="observer">
        <v-form :disabled="disabled" enctype="multipart/form-data">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Name*"
                    prepend-icon="mdi-face"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="event.name"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Shakha"
                  rules="required"
                >
                  <v-select
                    v-model="event.shakha_id"
                    :items="shakhas"
                    item-text="name"
                    item-value="id"
                    menu-props="auto"
                    label="Shakha"
                    prepend-icon="mdi-source-branch"
                    single-line
                    outlined
                    :error-messages="errors"
                    required
                  ></v-select>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Start time"
                  rules="required"
                >
                  <v-datetime-picker
                    label="Start Time"
                    v-model="event.start_time"
                    dateFormat="dd-MM-yyyy"
                    :textFieldProps="{
                      outlined: true,
                      'error-messages': errors,
                      'prepend-icon': 'mdi-calendar-clock',
                    }"
                  >
                  </v-datetime-picker>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="End time"
                  rules="required"
                >
                  <v-datetime-picker
                    label="End Time"
                    v-model="event.end_time"
                    dateFormat="dd-MM-yyyy"
                    :textFieldProps="{
                      outlined: true,
                      'error-messages': errors,
                      'prepend-icon': 'mdi-calendar-clock',
                    }"
                  >
                  </v-datetime-picker>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Type"
                  rules="required"
                >
                  <v-select
                    v-model="event.type"
                    :items="['Donation', 'Entertainment']"
                    menu-props="auto"
                    label="Type"
                    prepend-icon="mdi-align-vertical-center"
                    single-line
                    outlined
                    :error-messages="errors"
                    required
                  ></v-select>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Venue"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Venue"
                    prepend-icon="mdi-map-marker"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="event.venue"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Description"
                  rules="required"
                >
                  <v-textarea
                    outlined
                    label="Description*"
                    rows="3"
                    prepend-icon="mdi-details"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="event.description"
                    :error-messages="errors"
                    required
                  ></v-textarea>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="event.pre_registration"
                  label="Pre registration ?"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Expected Participation"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Expected Participation"
                    prepend-icon="mdi-approximately-equal"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="event.expected_participation"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Driver / Speaker"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Driver / Speaker"
                    prepend-icon="mdi-speaker-wireless"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="event.driver"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Location"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Location"
                    prepend-icon="mdi-earth"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="event.location"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>

              <v-col cols="12" sm="4">
                <v-checkbox v-model="event.paid" label="Paid ?"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="8" v-if="event.paid">
                <validation-provider
                  v-slot="{ errors }"
                  name="Cost"
                  rules="required"
                >
                  <v-text-field
                    type="number"
                    outlined
                    label="Cost*"
                    prepend-icon="mdi-credit-card-multiple-outline"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="event.cost"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </validation-observer>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn
        :loading="disabled"
        color="primary darken-2"
        outlined
        @click="validateform"
      >
        {{ type }}
        <v-icon left>
          {{
            type === "Add" ? "mdi-account-multiple-plus-outline" : "mdi-pencil"
          }}
        </v-icon>
      </v-btn>
      <v-snackbar v-model="snackbar" :timeout="2000">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card-actions>
  </v-card>
</template>

<script>
//@todo clear inputs of datepicker on submit
import { required, email, length } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { formatDate } from "~/utils/utils";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

extend("length", {
  ...length,
  message: "{_field_} should be equal to {length} characters",
});

export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons",
      },
    ],
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    type: {
      type: String,
    },
    event: {
      type: Object,
      default: function () {
        return {
          name: "",
          shakha_id: "",
          start_time: null,
          end_time: null,
          type: "",
          venue: "",
          description: "",
          pre_registration: false,
          paid: false,
          expected_participation: "",
          driver: "",
          state: "remaining",
          createdBy: "",
          updatedBy: "",
          row_state: "alive",
          location: "",
          cost: 0,
        };
      },
    },
  },
  data() {
    return {
      errorText:
        "Some error occured, please check your internet connection and try again later!",
      disabled: false,
      snackbar: false,
      snackbarText: "",
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
    validateform: function () {
      this.$refs.observer.validate().then((res) => {
        if (res === true) {
          if (this.type === "Add") this.addEvent();
          else if (this.type === "Update") this.updateEvent();
        }
      });
      //@todo  else {
      //   this.$nextTick(() => {
      //     const el = this.$el.querySelector(
      //       ".v-messages.error--text:first-of-type"
      //     );
      //     this.$vuetify.goTo(el);
      //   });
      // }
    },
    addEvent: function () {
      this.event.createdBy = this.$auth.user.email;
      this.event.updatedBy = this.$auth.user.email;
      this.disabled = true;
      this.$axios
        .post("/api/createEvent", this.event)
        .then((res) => {
          this.$refs.observer.reset();
          for (let key in this.event) this.event[key] = "";
          this.snackbarText = "Event Created!";
        })
        .catch(() => (this.snackbarText = this.errorText))
        .finally(() => {
          this.snackbar = true;
          this.disabled = false;
        });
    },
    updateEvent: function () {
      this.disabled = true;
      this.event.updatedBy = this.$auth.user.email;
      let shakha_id;
      if (typeof this.event.shakha_id == "object") {
        shakha_id = this.event.shakha_id.id;
      } else {
        shakha_id = this.event.shakha_id;
      }
      this.$axios
        .post("/api/updateEvent", {
          ...this.event,
          shakha_id,
        })
        .then((res) => {
          this.$emit("updateEvent", {
            ...this.event,
            shakha_id,
          });
          //   this.$refs.observer.reset();
          this.snackbarText = "Event Updated!";
        })
        .catch((err) => {
          this.snackbarText = this.errorText;
        })
        .finally(() => {
          this.snackbar = true;
          this.disabled = false;
        });
    },
  },
};
</script>

<style>
</style>