<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" persistent>
      <v-card>
        <v-card-title>Добавление читателя</v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-form>
            <v-text-field v-model="firstName" label="Имя"></v-text-field>
            <v-text-field v-model="middleName" label="Фамилия"></v-text-field>
            <v-text-field v-model="lastName" label="Отчество"></v-text-field>
            <v-text-field v-model="address" label="Адрес"></v-text-field>
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
    };
  },
  methods: {
    acceptAdd() {
      this.reader = {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        address: this.address,
      };
      this.$emit("add-confirm", this.reader);
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