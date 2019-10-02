<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :src="image"
    app
    color="grey darken-2"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)" />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar color="white">
        <v-img src="" height="34" contain />
      </v-list-item-avatar>

      <v-list-item-title class="title">TimeSheet</v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from "vuex";
import { mdiSignalCellular } from '@mdi/js';
import { mdiCash } from "@mdi/js";
import { mdiHome } from "@mdi/js";

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    links: [
      {
        to: "/",
        icon: "mdi-home",
        text: "Home"
      },
      {
        to: "/projects",
        icon: "mdi-axe",
        text: "Projects"
      },
      {
        to: "/hours",
        icon: "mdi-alarm-check",
        text: "Hours Appointment"
      },
      {
        to: "/value",
        icon: "mdi-cash",
        text: "Value Appointment"
      },
      {
        to: "/dashboards",
        icon: "mdi-signal",
        text: "Dashboards"
      }
    ]
  }),

  computed: {
    ...mapState("app", ["image", "color"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"])
  }
};
</script>
