<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" persistent>
      <v-card>
        <v-card-title>Редактирование книги</v-card-title>
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
    };
  },
  methods: {
    acceptEdit() {
      this.editedBook = {
        ...this.book,
        title: this.title,
        author: this.author,
        count: +this.count,
        year: this.year,
      };
      this.$emit("edit-confirm", this.editedBook);
    },
    denyEdit() {
      this.$emit("edit-deny");
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