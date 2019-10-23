<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex xs12 sm8 lg4 md5>
        <v-card class="login-card">
          <v-card-title>
            <span class="headline">Autenticação</span>
          </v-card-title>

          <v-spacer />

          <v-card-text>
            <v-layout row fill-height justify-center align-center v-if="loading">
              <v-progress-circular :size="50" color="primary" indeterminate />
            </v-layout>

            <v-form v-else ref="form" v-model="valid" lazy-validation>
              <v-container>
                <v-text-field
                  v-model="credentials.username"
                  :counter="70"
                  label="Login"
                  :rules="rules.username"
                  maxlength="70"
                  required
                />

                <v-text-field
                  type="password"
                  v-model="credentials.password"
                  :counter="20"
                  label="Senha"
                  :rules="rules.password"
                  maxlength="20"
                  required
                />
              </v-container>
              <v-btn class="orange white--text" :disabled="!valid" @click="login">Acessar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "Auth",
  data: () => ({
    credentials: {},
    valid: true,
    loading: false,
    rules: {
      username: [
        v => !!v || "Obrigatório",
        v => (v && v.length > 3) || "o login deve ter mais de 3 caracteres"
      ],
      password: [
        v => !!v || "Obrigatório",
        v => (v && v.length > 4) || "A senha deve conter mais de 4 caracteres"
      ]
    }
  }),
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        axios
          .post("http://localhost:8000/auth/", this.credentials)
          .then(res => {
            this.$session.start();
            this.$session.set("token", res.data.token);
            router.push("/");
          })
          .catch(() => {
            this.loading = false;
            alert("Login incorreto!");
          });
      }
    }
  }
};
</script>