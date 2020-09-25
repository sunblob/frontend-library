<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" persistent>
      <v-card>
        <v-card-title>Добавление читателя</v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-form ref="form">
            <v-text-field
              v-model="firstName"
              label="Имя"
              :rules="textRules"
            ></v-text-field>
            <v-text-field
              v-model="middleName"
              label="Фамилия"
              :rules="textRules"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              label="Отчество"
              :rules="textRules"
            ></v-text-field>
            <v-text-field
              v-model="address"
              label="Адрес"
              :rules="textRules"
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-btn color="primary" outlined @click="denyAdd">
            <span>Отмена</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="acceptAdd">
            <span>Добавить</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      reader: {},
      firstName: "",
      middleName: "",
      lastName: "",
      address: "",
      textRules: [
        (v) => !!v || "Поле не может быть пустым",
        (v) =>
          (v && v.length >= 1) ||
          "Поле должно быть как минимум длиной в 1 символ",
        (v) =>
          (v && v.trim().length != 0) ||
          "Поле не может состоять только из пробелов",
      ],
    };
  },
  methods: {
    acceptAdd() {
      if (this.$refs.form.validate()) {
        this.reader = {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
          address: this.address,
        };
      }
      this.$emit("add-confirm", this.reader);
      this.$refs.form.reset();
      this.clearFields();
    },
    denyAdd() {
      this.$emit("add-deny");
      this.clearFields();
    },
    clearFields() {
      this.firstName = "";
      this.middleName = "";
      this.lastName = "";
      this.address = "";
    },
  },
};
</script>

<style>
</style>