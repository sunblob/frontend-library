<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" persistent>
      <v-card>
        <v-card-title>Добавление книги</v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-form>
            <v-text-field v-model="title" label="Название"></v-text-field>
            <v-text-field v-model="author" label="Автор"></v-text-field>
            <v-text-field v-model="count" label="Количество" type="number"></v-text-field>
            <v-text-field v-model="year" label="Год издания" type="number"></v-text-field>
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
import moment from "moment";

export default {
  props: ["show"],
  components: {
    // DatePicker,
  },
  data() {
    return {
      book: {},
      title: "",
      author: "",
      count: 0,
      year: "",
    };
  },
  methods: {
    acceptAdd() {
      this.book = {
        title: this.title,
        author: this.author,
        count: +this.count,
        year: moment(this.year, "YYYY").format(),
      };
      this.$emit("add-confirm", this.book);
      this.clearFields();
    },
    denyAdd() {
      this.$emit("add-deny");
      this.clearFields();
    },
    clearFields() {
      this.title = "";
      this.author = "";
      this.count = 0;
      this.year = "";
    },
  },
};
</script>

<style>
</style>