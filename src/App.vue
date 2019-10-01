<template>
  <v-app>
    <v-app-bar app :dark="true">
      <v-toolbar-title class="headline text-uppercase">
        <span>TimeSheet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-navigation-drawer absolute permanent left>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="./assets/tsm_medium.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-col>
        <p align="center">
          <v-content>
            <router-view />
          </v-content>
        </p>
      </v-col>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "List Projects", icon: "mdi-home", to: "/index" },
        { title: "Add Projects", icon: "mdi-home", to: "/create" }
      ],
      mini: true
    };
  }
};
</script>
