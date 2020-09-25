<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" persistent>
      <v-card>
        <v-card-title>Редактирование книги</v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-form ref="form">
            <v-text-field
              v-model="title"
              label="Название"
              :rules="titleRules"
            ></v-text-field>
            <v-text-field
              v-model="author"
              label="Автор"
              :rules="authorRules"
            ></v-text-field>
            <v-text-field
              v-model="count"
              label="Количество"
              type="number"
              min="1"
              :rules="countRules"
            ></v-text-field>
            <v-text-field
              v-model="year"
              label="Год издания"
              type="number"
              min="0"
              max="2020"
              :rules="yearRules"
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
import moment from "moment";

export default {
  props: ["show", "book"],
  data() {
    return {
      editedBook: {},
      title: "",
      author: "",
      count: 0,
      year: "",
      titleRules: [
        (v) => !!v || "Введите название",
        (v) =>
          (v && v.length >= 1) ||
          "Название должно быть как минимум длиной в 1 символ",
        (v) =>
          (v && v.trim().length != 0) ||
          "Название не может состоять только из пробелов",
      ],
      authorRules: [
        (v) => !!v || "Введите автора",
        (v) =>
          (v && v.length >= 1) ||
          "Автор должен быть как минимум длиной в 1 символ",
        (v) =>
          (v && v.trim().length != 0) ||
          "Имя автора не может состоять только из пробелов",
      ],
      countRules: [
        (v) => (v && +v >= 1) || "Количество книг не может быть меньше 1",
      ],
      yearRules: [
        (v) =>
          +v <= new Date().getFullYear() ||
          `Год издания не может привышать ${new Date().getFullYear()}`,
      ],
    };
  },
  methods: {
    acceptEdit() {
      if (this.$refs.form.validate()) {
        this.editedBook = {
          ...this.book,
          title: this.title.trimStart(),
          author: this.author.trimStart(),
          count: +this.count,
          year: this.year,
        };
        this.$refs.form.reset();
        this.$emit("edit-confirm", this.editedBook);
      }
    },
    disableRule() {
      return this.title.trim().length === 0 || this.author.trim().length === 0;
    },
    denyEdit() {
      this.$emit("edit-deny");
    },
    validateField() {
      this.$refs.form.validate();
    },
  },
  mounted() {
    this.title = this.book.title;
    this.author = this.book.author;
    this.count = this.book.count;
    this.year = moment(this.book.year).format("YYYY");
  },
};
</script>

<style>
</style>