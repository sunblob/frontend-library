<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" persistent>
      <v-card>
        <v-card-title>Редактирование читателя</v-card-title>
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
    };
  },
  methods: {
    acceptEdit() {
      this.editedReader = {
        ...this.reader,
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        address: this.address,
      };
      this.$emit("edit-confirm", this.editedReader);
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