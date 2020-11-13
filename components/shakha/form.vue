<template>
  <v-card elevation="2" outlined>
    <v-card-title>{{ type }} a Shakha</v-card-title>
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
                    prepend-icon="mdi-source-branch"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="shakha.name"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="State"
                  rules="required"
                >
                  <v-select
                    v-model="shakha.state"
                    :items="indian_states"
                    menu-props="auto"
                    label="State"
                    prepend-icon="mdi-home-city-outline"
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
                  name="Location"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Location"
                    prepend-icon="mdi-earth"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="shakha.location"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Pin Code"
                  rules="required|length:6"
                >
                  <v-text-field
                    type="number"
                    outlined
                    label="Pin Code"
                    prepend-icon="mdi-pin"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="shakha.pin_code"
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
import { indian_states } from "@/assets/js/indian_states";
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
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    type: {
      type: String,
    },
    shakha: {
      type: Object,
      default: function () {
        return {
          name: "",
          state: "",
          pin_code: "",
          location: "",
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
      indian_states,
    };
  },
  methods: {
    validateform: function () {
      this.$refs.observer.validate().then((res) => {
        if (res === true) {
          if (this.type === "Add") this.addShakha();
          else if (this.type === "Update") this.updateShakha();
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
    addShakha: function () {
      //   this.shakha.createdBy = this.$auth.user.email;
      //   this.shakha.updatedBy = this.$auth.user.email;
      this.disabled = true;
      this.$axios
        .post("/api/createShakha", this.shakha)
        .then((res) => {
          this.$refs.observer.reset();
          for (let key in this.shakha) this.shakha[key] = "";
          this.snackbarText = "Shakha Created!";
        })
        .catch(() => (this.snackbarText = this.errorText))
        .finally(() => {
          this.snackbar = true;
          this.disabled = false;
        });
    },
    updateShakha: function () {
      this.disabled = true;
      this.$axios
        .post("/api/updateShakha", this.shakha)
        .then((res) => {
          this.$emit("updateShakha", this.shakha);
          //   this.$refs.observer.reset();

          this.snackbarText = "Shakha Updated!";
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