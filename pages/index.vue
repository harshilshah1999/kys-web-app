<template>
  <!-- Landing Page goes here -->
  <div>
    <video autoplay muted loop id="myVideo">
      <source src="backgroundvideo.mp4" type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>
    <v-container>
      <!--Upcoming Events-->
      <v-row>
        <v-col cols="12" align="center"> <h1>Upcoming Events</h1></v-col>
      </v-row>
      <v-row>
        <v-slide-group
          v-model="model"
          class="pa-4"
          active-class="red accent-2"
          show-arrows
        >
          <v-slide-item v-for="n in 5" :key="n" v-slot="{ active, toggle }">
            <v-card
              :color="active ? undefined : 'white'"
              class="ma-4"
              @click="toggle"
            >
              <v-card-title>
                <v-icon> mdi-calendar </v-icon>
                12th March <v-spacer></v-spacer>
                <h5>Monday</h5></v-card-title
              >
              <v-card-subtitle> 2021 </v-card-subtitle>
              <v-card-text>
                <h1>Anchorwala Blood Donation Camp</h1>
                <h3>
                  <v-icon small>mdi-home</v-icon>
                  Virar
                </h3>
                <h5>
                  <v-icon small>mdi-map-marker</v-icon>
                  Bhayndar east
                </h5>
              </v-card-text>
              <v-card-actions>
                <v-btn elevation="2">Register</v-btn>
                <v-spacer></v-spacer>
                <v-chip class="ma-2" color="indigo" text-color="white">
                  <v-avatar left>
                    <v-icon>mdi-progress-clock</v-icon>
                  </v-avatar>
                  12:00 am to 05:00 pm
                </v-chip>
              </v-card-actions>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-row>
    </v-container>
    <v-parallax
      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      height="300"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 mb-4">About Us</h1>
          <h4 class="subheading font-weight-regular">
            ‘Kutch Yuvak Sangh’ is one of the leading organizations which act as
            a bridge between Mumbai and Kutch. Since a very long time it is
            working constructively for developing various parts of Kutch and for
            supporting people of Kutchi community residing in Mumbai and in
            Kutch. Their main aim is to take along the overall development of
            the Kutchi community and to resolve the various issues relating to
            Kutch. On numerous occasions they had to fight, struggle and work
            hard to get the solutions related to the benefit of the community.
            Kutch Yuvak Sangh through its various humanitarian programs has
            given special and applauding share to the social, educational and
            cultural sectors of mankind.
          </h4>
          <br /><br />
          <v-btn> Know more</v-btn>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center">
          <h1>Our Contribution Towards Society</h1>
        </v-col>
        <v-col cols="4">
          <v-card elevation="1">
            <v-card-title class="justify-center"> Blood Donation </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-timeline align-top dense>
                <v-timeline-item
                  v-for="message in messages"
                  :key="message.time"
                  :color="message.color"
                  :icon="message.icon"
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>{{ message.from }}</strong>
                    </div>
                    <div>{{ message.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card elevation="7">
            <v-card-title class="justify-center"> Help Provided </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row align="center">
                <v-col cols="4">
                  <v-progress-circular
                    :rotate="360"
                    :size="90"
                    :width="5"
                    :value="85"
                    color="teal"
                  >
                    60, 123
                  </v-progress-circular>
                </v-col>
                <v-col cols="8">
                  <h3>Patients helped with blood units provided</h3>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="8">
                  <h3>Patients helped with plasma units provided</h3>
                </v-col>
                <v-col cols="4">
                  <v-progress-circular
                    :rotate="360"
                    :size="90"
                    :width="5"
                    :value="50"
                    color="red accent-3"
                  >
                    587
                  </v-progress-circular>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="4">
                  <v-progress-circular
                    :rotate="360"
                    :size="90"
                    :width="5"
                    :value="70"
                    color="yellow accent-3"
                  >
                    795
                  </v-progress-circular>
                </v-col>
                <v-col cols="8">
                  <h3>Patients helped with platelets units provided</h3>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card elevation="1">
            <v-card-title class="justify-center"> Education </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-timeline align-top dense>
                <v-timeline-item
                  v-for="message in education"
                  :key="message.time"
                  :color="message.color"
                  :icon="message.icon"
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>{{ message.from }}</strong>
                    </div>
                    <div>{{ message.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <br />
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" align="center">
          <h1>Some of the Testimonials</h1>
        </v-col>
        <v-col cols="4">
          <v-card elevation="3">
            <v-card-text
              style="
                padding-bottom: 0px;
                padding-left: 12px;
                padding-right: 12px;
              "
            >
              <v-row>
                <v-col cols="12" align="left">
                  <v-icon large color="green">
                    mdi-comment-quote-outline
                  </v-icon>
                </v-col>
                <v-col cols="12" align="center">
                  <h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sed suscipit aliquam explicabo soluta voluptate. Consequatur
                    repellat quos distinctio dolor quam at aliquid aperiam
                    dignissimos, nesciunt ab ex, praesentium quod inventore
                  </h3>
                </v-col>
                <v-col
                  cols="12"
                  align="center"
                  style="z-index: 2; margin-bottom: -220px"
                >
                  <v-avatar size="89">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                      style="border: 7px white solid"
                    />
                  </v-avatar>
                  <h2 class="white--text pa-5">Jiggish Chedda</h2>
                  <v-btn
                    v-for="icon in icons"
                    :key="icon"
                    class="mx-4 white--text"
                    icon
                  >
                    <v-icon size="24px" color="black">
                      {{ icon }}
                    </v-icon>
                  </v-btn>
                </v-col>
                <svg>
                  <clipPath id="wave" clipPathUnits="objectBoundingBox">
                    <path
                      class="st0"
                      d="M 1 0 c 0 0 -0.329 0.356 -0.5 0.1 S 0.21 0.21 0 0.1 V 1 h 1 L 1 0 z"
                    />
                  </clipPath>
                </svg>
                <v-col
                  cols="12"
                  align="center"
                  style="
                    margin-top: -100px;
                    background: #4caf50;
                    height: 200px;
                    clip-path: url(#wave);
                  "
                >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card elevation="3">
            <v-card-text
              style="
                padding-bottom: 0px;
                padding-left: 12px;
                padding-right: 12px;
              "
            >
              <v-row>
                <v-col cols="12" align="left">
                  <v-icon large color="purple lighten-1">
                    mdi-comment-quote-outline
                  </v-icon>
                </v-col>
                <v-col cols="12" align="center">
                  <h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sed suscipit aliquam explicabo soluta voluptate. Consequatur
                    repellat quos distinctio dolor quam at aliquid aperiam
                    dignissimos, nesciunt ab ex, praesentium quod inventore
                  </h3>
                </v-col>
                <v-col
                  cols="12"
                  align="center"
                  style="z-index: 2; margin-bottom: -220px"
                >
                  <v-avatar size="89">
                    <img
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      alt="John"
                      style="border: 7px white solid"
                    />
                  </v-avatar>
                  <h2 class="white--text pa-5">Vaibhav Mehta</h2>
                  <v-btn
                    v-for="icon in icons"
                    :key="icon"
                    class="mx-4 white--text"
                    icon
                  >
                    <v-icon size="24px" color="black">
                      {{ icon }}
                    </v-icon>
                  </v-btn>
                </v-col>
                <svg>
                  <clipPath id="wave2" clipPathUnits="objectBoundingBox">
                    <path
                      class="st0"
                      d="M 0.996 0.146 c -0.004 0.091 -0.146 0.192 -0.31 0.096 S 0.009 -0.009 0.009 0.046 V 1 h 1 L 1 0.151 z"
                    />
                  </clipPath>
                </svg>
                <v-col
                  cols="12"
                  align="center"
                  style="
                    margin-top: -100px;
                    background: #ab47bc;
                    height: 200px;
                    clip-path: url(#wave2);
                  "
                >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card elevation="3">
            <v-card-text
              style="
                padding-bottom: 0px;
                padding-left: 12px;
                padding-right: 12px;
              "
            >
              <v-row>
                <v-col cols="12" align="left">
                  <v-icon large color="blue">
                    mdi-comment-quote-outline
                  </v-icon>
                </v-col>
                <v-col cols="12" align="center">
                  <h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sed suscipit aliquam explicabo soluta voluptate. Consequatur
                    repellat quos distinctio dolor quam at aliquid aperiam
                    dignissimos, nesciunt ab ex, praesentium quod inventore
                  </h3>
                </v-col>
                <v-col
                  cols="12"
                  align="center"
                  style="z-index: 2; margin-bottom: -220px"
                >
                  <v-avatar size="89">
                    <img
                      src="https://i.pravatar.cc/300"
                      alt="John"
                      style="border: 7px white solid"
                    />
                  </v-avatar>
                  <h2 class="white--text pa-5">Jane Doe</h2>
                  <v-btn
                    v-for="icon in icons"
                    :key="icon"
                    class="mx-4 white--text"
                    icon
                  >
                    <v-icon size="24px" color="black">
                      {{ icon }}
                    </v-icon>
                  </v-btn>
                </v-col>
                <svg>
                  <clipPath id="wave3" clipPathUnits="objectBoundingBox">
                    <path
                      class="st0"
                      d="M 0.996 0.146 c -0.004 0.091 -0.146 0.192 -0.337 0.015 S 0.009 -0.009 -0.002 0.157 V 1 h 1 L 1 0.151 z"
                    />
                  </clipPath>
                </svg>
                <v-col
                  cols="12"
                  align="center"
                  style="
                    margin-top: -100px;
                    background: #2196f3;
                    height: 200px;
                    clip-path: url(#wave3);
                  "
                >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <br />
      <v-divider></v-divider>
      <v-row justify="center" align="center">
        <v-col cols="12" align="center">
          <h1>Some of our partners</h1>
        </v-col>
        <v-col cols="2" align="center">
          <v-card elevation="5" style="border-radius: 25px; margin: 12px">
            <v-card-text>
              <v-img
                height="100"
                width="100"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI5kyVxZKH4YbZ9MVJzaxVUUOsOC8TuWVuLQ&usqp=CAU"
              ></v-img>
            </v-card-text>
          </v-card>
          <v-card elevation="5" style="border-radius: 25px; margin: 12px">
            <v-card-text>
              <v-img
                height="100"
                width="100"
                src="https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-articleLarge-v4.jpg?quality=75&auto=webp&disable=upscale"
              ></v-img>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="2" align="center">
          <v-card elevation="5" style="border-radius: 25px; margin: 12px">
            <v-card-text>
              <v-img
                height="100"
                width="100"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png"
              ></v-img>
            </v-card-text>
          </v-card>
          <v-card elevation="5" style="border-radius: 25px; margin: 12px">
            <v-card-text>
              <v-img
                height="100"
                width="100"
                src="https://cdn.shopify.com/shopifycloud/hatchful-web/assets/6fcc76cfd1c59f44d43a485167fb3139.png"
              ></v-img>
            </v-card-text>
          </v-card>
          <v-card elevation="5" style="border-radius: 25px; margin: 12px">
            <v-card-text>
              <v-img
                height="100"
                width="100"
                src="https://cdn.shopify.com/shopifycloud/hatchful-web/assets/5d6266e7bbcdb8fb017c10000ead2fd3.png"
              ></v-img>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="2" align="center">
          <v-card elevation="5" style="border-radius: 25px; margin: 12px">
            <v-card-text>
              <v-img
                height="100"
                width="100"
                src="https://cdn.dribbble.com/users/182238/screenshots/2383317/lion2.jpg"
              ></v-img>
            </v-card-text>
          </v-card>
          <v-card elevation="5" style="border-radius: 25px; margin: 12px">
            <v-card-text>
              <v-img
                height="100"
                width="100"
                src="data:image/png;base64,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"
              ></v-img>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "website",
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin"],
      messages: [
        {
          from: "150",
          message: `Blood Camps`,
          icon: "mdi-water-check",
          color: "deep-purple lighten-1",
        },
        {
          from: "70,125",
          message: "Number of Donors",
          icon: "mdi-account-group-outline",
          color: "green",
        },
        {
          from: "215,036",
          message: "Blood Bottles",
          icon: "mdi-blood-bag",
          color: "red accent-3",
        },
      ],
      education: [
        {
          from: "3",
          message: `Number of Schools Adopted`,
          icon: "mdi-human-male-boy",
          color: "deep-purple lighten-1",
        },
        {
          from: "1000+",
          message: "Children Educated",
          icon: "mdi-school-outline",
          color: "green",
        },
        {
          from: "200+",
          message: "Employment Generated",
          icon: "mdi-shield-star-outline",
          color: "red accent-3",
        },
      ],
      model: null,
      slides: ["1.png", "1.png"],
      items: [
        {
          color: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          artist: "Foster the People",
        },
        {
          color: "#952175",
          src: "/slider/start.jpg",
          title: "Halcyon Days",
          artist: "Ellie Goulding",
        },
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          artist: "Ellie Goulding",
        },
      ],
    };
  },
};
</script>
<style scoped>
#myVideo {
  left: 0;
  height: 100vh;
  right: 0;
  bottom: 0;
  top: 0;
  min-width: 100%;
  min-height: 100%;
}
</style>