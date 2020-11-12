<template>
  <v-card elevation="2" outlined>
    <v-card-title>{{ type }} a Volunteer</v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <validation-observer ref="observer">
        <v-form :disabled="disabled" enctype="multipart/form-data">
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <validation-provider
                  v-slot="{ errors }"
                  name="First Name"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="First Name*"
                    prepend-icon="mdi-face"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="volunteer.first_name"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="4">
                <validation-provider
                  v-slot="{ errors }"
                  name="Middle Name"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Middle Name*"
                    prepend-icon="mdi-face-profile"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="volunteer.middle_name"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="4">
                <validation-provider
                  v-slot="{ errors }"
                  name="Last Name"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Last Name*"
                    prepend-icon="mdi-face-outline"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="volunteer.last_name"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Phone number"
                  rules="required|length:10"
                >
                  <v-text-field
                    type="number"
                    outlined
                    label="Phone Number*"
                    prepend-icon="mdi-phone-outline"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="volunteer.phone_number"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    outlined
                    label="Email*"
                    prepend-icon="mdi-gmail"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="volunteer.email"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Native Place"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Native Place*"
                    prepend-icon="mdi-home-outline"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="volunteer.native_place"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  name="Date of Birth"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-menu
                    ref="date_of_birth_menu"
                    :close-on-content-click="false"
                    :return-value.sync="volunteer.date_of_birth"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="formattedDateOfBirth"
                        label="Date of Birth*"
                        prepend-icon="mdi-calendar"
                        readonly
                        :error-messages="errors[0]"
                        v-on="on"
                        outlined
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="volunteer.date_of_birth"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>

                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.date_of_birth_menu.save(volunteer.date_of_birth)
                        "
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Gender"
                  rules="required"
                >
                  <v-select
                    v-model="volunteer.gender"
                    :items="['Male', 'Female', 'Rather not say']"
                    menu-props="auto"
                    label="Gender*"
                    prepend-icon="mdi-gender-non-binary"
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
                  name="Shakha"
                  rules="required"
                >
                  <v-select
                    v-model="volunteer.shakha"
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
              <v-col cols="12" sm="8">
                <validation-provider
                  v-slot="{ errors }"
                  name="Address"
                  rules="required"
                >
                  <v-textarea
                    outlined
                    label="Address*"
                    rows="3"
                    prepend-icon="mdi-earth"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="volunteer.address"
                    :error-messages="errors"
                    required
                  ></v-textarea>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="4">
                <validation-provider
                  v-slot="{ errors }"
                  name="Pin Code"
                  rules="required"
                >
                  <v-text-field
                    type="number"
                    outlined
                    label="Pin Code*"
                    prepend-icon="mdi-pin-outline"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="volunteer.pin_code"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  name="Registration Date"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-menu
                    ref="registration_date_menu"
                    :close-on-content-click="false"
                    :return-value.sync="volunteer.registration_date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="formattedRegistrationDate"
                        label="Registration Date*"
                        prepend-icon="mdi-calendar"
                        readonly
                        :error-messages="errors[0]"
                        v-on="on"
                        outlined
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="volunteer.registration_date"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.registration_date_menu.save(
                            volunteer.registration_date
                          )
                        "
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  name="Expiration Date"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-menu
                    ref="expiration_date_menu"
                    :close-on-content-click="false"
                    :return-value.sync="volunteer.expiration_date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="formattedExpirationDate"
                        label="Expiry Date*"
                        prepend-icon="mdi-calendar"
                        readonly
                        :error-messages="errors[0]"
                        v-on="on"
                        outlined
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="volunteer.expiration_date"
                      :min="new Date().toISOString().substr(0, 10)"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.expiration_date_menu.save(
                            volunteer.expiration_date
                          )
                        "
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="3">
                <validation-provider
                  v-slot="{ errors }"
                  name="Blood Group"
                  rules="required"
                >
                  <v-select
                    v-model="volunteer.blood_group"
                    :items="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                    menu-props="auto"
                    label="Blood Group"
                    prepend-icon="mdi-water-outline"
                    single-line
                    outlined
                    :error-messages="errors"
                    required
                  ></v-select>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="5">
                <validation-provider
                  v-slot="{ errors }"
                  name="Education"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Education*"
                    prepend-icon="mdi-cast-education"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="volunteer.education"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="4">
                <validation-provider
                  v-slot="{ errors }"
                  name="Occupation"
                  rules="required"
                >
                  <v-text-field
                    outlined
                    label="Occupation*"
                    prepend-icon="mdi-office-building-outline"
                    clearable
                    clear-icon="mdi-close-circle"
                    v-model="volunteer.occupation"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12">
                <validation-provider
                  :rules="type === 'Add' ? 'required' : ''"
                  v-slot="{ validate, errors }"
                  name="Profile Picture"
                >
                  <v-file-input
                    :label="
                      type === 'Add'
                        ? 'Profile Picture*'
                        : 'Update Profile Picture'
                    "
                    placeholder="Select a file"
                    prepend-icon="mdi-camera-account"
                    outlined
                    :show-size="1000"
                    :error-messages="errors"
                    @change="
                      ($event) => {
                        profile_picture_file = $event;
                        validate($event);
                      }
                    "
                    ref="profile_picture_file"
                    accept="image/*"
                    required
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip dark label small>
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
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
    volunteer: {
      type: Object,
      default: function () {
        return {
          first_name: "",
          middle_name: "",
          last_name: "",
          phone_number: "",
          email: "",
          native_place: "",
          date_of_birth: "",
          gender: "",
          address: "",
          pin_code: "",
          registration_date: "",
          expiration_date: "",
          blood_group: "",
          education: "",
          occupation: "",
          profile_picture_path: "",
          shakha: "",
        };
      },
    },
  },
  data() {
    return {
      shakhas: [],
      disabled: false,
      snackbar: false,
      profile_picture_file: null,
      snackbarText: "",
      errorText:
        "Some error occured, please check your internet connection and try again later!",
    };
  },
  methods: {
    validateform: function () {
      this.$refs.observer.validate().then((res) => {
        if (res === true) {
          if (this.type === "Add") this.addVolunteer();
          else if (this.type === "Update") this.updateVolunteer();
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
    addVolunteer: function () {
      const time = Date.now();
      this.volunteer.createdBy = this.$auth.user.email;
      this.volunteer.updatedBy = this.$auth.user.email;
      this.volunteer.profile_picture_path =
        time + "_" + this.profile_picture_file.name;
      let formData = new FormData();
      formData.append("file", this.profile_picture_file);

      this.disabled = true;

      this.$axios
        .post("/api/uploadVolunteerPicture", formData, {
          headers: {
            filename: time,
          },
        })
        .then((res) => {
          this.$axios
            .post("/api/createVolunteer", this.volunteer)
            .then((res) => {
              this.$refs.observer.reset();
              this.profile_picture_file = null;
              this.$refs.profile_picture_file.value = null;
              for (let key in this.volunteer) this.volunteer[key] = "";
              this.snackbarText = "Volunteer Created!";
            })
            .catch(() => (this.snackbarText = this.errorText));
        })
        .catch(() => (this.snackbarText = this.errorText))
        .finally(() => {
          this.snackbar = true;
          this.disabled = false;
        });
    },
    updateVolunteer: function () {
      let promises = [];
      this.disabled = true;
      this.volunteer.updatedBy = this.$auth.user.email;
      if (this.profile_picture_file) {
        const oldFile = this.volunteer.profile_picture_path;
        const time = Date.now();
        this.volunteer.profile_picture_path =
          time + "_" + this.profile_picture_file.name;
        let formData = new FormData();
        formData.append("file", this.profile_picture_file);
        promises.push(
          this.$axios.post("/api/uploadVolunteerPicture", formData, {
            headers: {
              filename: time,
              oldfile: oldFile,
            },
          })
        );
      }
      promises.push(this.$axios.post("/api/updateVolunteer", this.volunteer));

      Promise.all(promises)
        .then((res) => {
          this.volunteer =
            this.profile_picture_file === null ? res[0].data : res[1].data;
          this.$emit("updateVolunteer", this.volunteer);
          this.$refs.observer.reset();
          this.profile_picture_file = null;
          this.$refs.profile_picture_file.value = null;
          this.snackbarText = "Volunteer Updated!";
        })
        .catch((err) => {
          this.snackbarText = this.errorText;
        })
        .finally(() => {
          this.snackbar = true;
          this.disabled = false;
        });
    },
    save(date) {
      this.$refs.menu.save(date);
    },
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
  computed: {
    formattedDateOfBirth: function () {
      return formatDate(this.volunteer.date_of_birth);
    },
    formattedRegistrationDate: function () {
      return formatDate(this.volunteer.registration_date);
    },
    formattedExpirationDate: function () {
      return formatDate(this.volunteer.expiration_date);
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
</script>

<style>
</style>