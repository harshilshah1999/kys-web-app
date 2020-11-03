<template>
  <v-card elevation="2" outlined>
    <v-card-title>{{ type }} a Volunteer</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form
        v-model="valid"
        :disabled="disabled"
        enctype="multipart/form-data"
        lazy-validation
        ref="volunteerForm"
      >
        <v-container>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                label="First Name*"
                prepend-icon="mdi-face"
                clearable
                clear-icon="mdi-close-circle"
                v-model="volunteer.first_name"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                label="Middle Name*"
                prepend-icon="mdi-face-profile"
                clearable
                clear-icon="mdi-close-circle"
                v-model="volunteer.middle_name"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                label="Last Name*"
                prepend-icon="mdi-face-outline"
                clearable
                clear-icon="mdi-close-circle"
                v-model="volunteer.last_name"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                type="number"
                outlined
                label="Phone Number*"
                prepend-icon="mdi-phone-outline"
                clearable
                clear-icon="mdi-close-circle"
                v-model="volunteer.phone_number"
                :rules="[rules.required, rules.phone_number]"
                validate-on-blur
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                outlined
                label="Email*"
                prepend-icon="mdi-gmail"
                clearable
                clear-icon="mdi-close-circle"
                v-model="volunteer.email"
                :rules="[rules.required, rules.email]"
                validate-on-blur
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                outlined
                label="Native Place*"
                prepend-icon="mdi-home-outline"
                clearable
                clear-icon="mdi-close-circle"
                v-model="volunteer.native_place"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formattedDateOfBirth"
                    label="Date of Birth*"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="volunteer.date_of_birth"
                  :max="new Date().toISOString().substr(0, 10)"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="volunteer.gender"
                :items="['Male', 'Female', 'Rather not say']"
                menu-props="auto"
                label="Gender*"
                prepend-icon="mdi-gender-non-binary"
                single-line
                outlined
                :rules="[rules.required]"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6"> *which organization* </v-col>
            <v-col cols="12" sm="8">
              <v-textarea
                outlined
                label="Address*"
                rows="3"
                prepend-icon="mdi-earth"
                clearable
                clear-icon="mdi-close-circle"
                v-model="volunteer.address"
                :rules="[rules.required]"
                required
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                type="number"
                outlined
                label="Pin Code*"
                prepend-icon="mdi-pin-outline"
                clearable
                clear-icon="mdi-close-circle"
                v-model="volunteer.pin_code"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-dialog
                ref="registration_dialog"
                v-model="registration_modal"
                :return-value.sync="volunteer.registration_date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formattedRegistrationDate"
                    label="Registration Date*"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker v-model="volunteer.registration_date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="registration_modal = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.registration_dialog.save(
                        volunteer.registration_date
                      )
                    "
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="6">
              <v-dialog
                ref="expiration_dialog"
                v-model="expiration_modal"
                :return-value.sync="volunteer.expiration_date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formattedExpirationDate"
                    label="Expiry Date*"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="volunteer.expiration_date"
                  scrollable
                  :min="new Date().toISOString().substr(0, 10)"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="expiration_modal = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.expiration_dialog.save(volunteer.expiration_date)
                    "
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="3">
              <v-select
                v-model="volunteer.blood_group"
                :items="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                menu-props="auto"
                label="Blood Group"
                prepend-icon="mdi-water-outline"
                single-line
                outlined
                :rules="[rules.required]"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="5">
              <v-text-field
                outlined
                label="Education*"
                prepend-icon="mdi-cast-education"
                clearable
                clear-icon="mdi-close-circle"
                v-model="volunteer.education"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                label="Occupation*"
                prepend-icon="mdi-office-building-outline"
                clearable
                clear-icon="mdi-close-circle"
                v-model="volunteer.occupation"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
                :label="
                  type === 'Add' ? 'Profile Picture*' : 'Update Profile Picture'
                "
                placeholder="Select a file"
                prepend-icon="mdi-camera-account"
                outlined
                :show-size="1000"
                v-model="profile_picture_file"
                accept="image/*"
                :rules="type === 'Add' ? [rules.required] : []"
                required
              >
                <template v-slot:selection="{ text }">
                  <v-chip dark label small>
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn
        :loading="disabled"
        color="primary darken-2"
        outlined
        @click="validateform"
        :disabled="!valid"
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
import { formatDate } from "~/utils/utils";

export default {
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
        };
      },
    },
  },
  data() {
    return {
      errorText:
        "Some error occured, please check your internet connection and try again later!",
      registration_modal: false,
      expiration_modal: false,
      menu: false,
      disabled: false,
      valid: true,
      snackbar: false,
      profile_picture_file: null,
      snackbarText: "",

      rules: {
        required: (v) => !!v || "Please fill this field",
        phone_number: (v) =>
          v.toString().length === 10 || "Please enter a 10 digit number",
        email: (v) => /.+@.+\..+/.test(v) || "Please enter a valid email",
      },
    };
  },
  methods: {
    validateform: function () {
      if (this.$refs.volunteerForm.validate()) {
        if (this.type === "Add") this.addVolunteer();
        else if (this.type === "Update") this.updateVolunteer();
      }
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
              this.$refs.volunteerForm.resetValidation();
              this.profile_picture_file = null;
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
          this.$refs.volunteerForm.resetValidation();
          this.profile_picture_file = null;
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