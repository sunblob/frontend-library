<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" persistent>
      <v-card>
        <v-card-title>Редактирование читателя</v-card-title>
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
          <v-btn color="primary" outlined @click="denyEdit">
            <span>Отмена</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="acceptEdit">
            <span>Редактировать</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["show", "reader"],
  data() {
    return {
      editedReader: {},
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
    acceptEdit() {
      if (this.$refs.form.validate()) {
        this.editedReader = {
          ...this.reader,
          firstName: this.firstName.trimStart(),
          middleName: this.middleName.trimStart(),
          lastName: this.lastName.trimStart(),
          address: this.address.trimStart(),
        };
      }
      this.$emit("edit-confirm", this.editedReader);
      this.$refs.form.reset();
    },
    denyEdit() {
      this.$emit("edit-deny");
    },
  },
  mounted() {
    this.firstName = this.reader.firstName;
    this.middleName = this.reader.middleName;
    this.lastName = this.reader.lastName;
    this.address = this.reader.address;
  },
};
</script>

<style>
</style>