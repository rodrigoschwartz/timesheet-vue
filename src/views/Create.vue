<template>
  <v-content class="mx-auto">
    <form align="right">
      <v-text-field
        v-model="project.demandCode"
        id="demandcode"
        label="DemandCode"
        type="number"
        class="form-control"
        placeholder="Enter demand code"
      ></v-text-field>
      <v-text-field
        class="form-control"
        id="description"
        v-model="project.description"
        placeholder="Enter description"
        label="description"
      ></v-text-field>
      <v-text-field
        v-model="project.value"
        id="value"
        label="value"
        type="number"
        class="form-control"
        placeholder="Enter value"
      ></v-text-field>
      <v-text-field
        v-model="project.hours"
        id="hours"
        label="hours"
        type="number"
        class="form-control"
        placeholder="Enter hours"
      ></v-text-field>
      <v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="Item"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select>
      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      project: {
        demandcode: "",
        description: "",
        value: "",
        hours: ""
      },
      submitted: false
    };
  },
  methods: {
    create: function(proj) {
      this.submitted = true;
      console.log(this.value);
      axios
        .post("http://localhost:8000/projects/", this.project)
        .then(response => {
          this.$router.push("/");
        });
    }
  }
};
</script>