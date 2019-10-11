<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <material-stats-card
          color="orange"
          icon="mdi-av-timer"
          title="Horas Apontadas Hoje"
          value="5/8"
          small-value="H"  
        />
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import router from "../router";

export default {
  mounted() {
    this.checkLoggedIn();
  },

  methods: {
    checkLoggedIn: function() {
      this.$session.start();
      if (!this.$session.has("token")) {
        router.push("/auth");
      }
    }
  }
};
</script>