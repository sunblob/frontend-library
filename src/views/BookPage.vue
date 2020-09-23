<template>
  <v-container fluid>
    <v-row justify="space-between" class="ma-5">
      <v-col cols="3">
        <v-row>
          <v-text-field
            v-model="authorFilter"
            label="Поиск по автору"
          ></v-text-field>
          <v-btn class="mx-2" fab dark color="indigo" @click="searchForBooks">
            <v-icon dark>mdi-magnify</v-icon>
          </v-btn>
          <v-btn class="mx-2" fab dark color="indigo" @click="getBooks">
            <v-icon dark>mdi-close-circle</v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-text-field
            v-model="yearFilter"
            label="Поиск по году"
            type="number"
          ></v-text-field>
        </v-row>
      </v-col>
      <v-col cols="4" v-if="books.length > 0">
        <div v-for="book in books" :key="book.id">
          <v-card class="ma-5" hover>
            <v-card-title>{{ book.title }}</v-card-title>
            <v-card-subtitle>{{ book.author }}</v-card-subtitle>
            <v-card-actions>
              Количество книг: {{ book.count }}
              <v-spacer></v-spacer>
              Год издания: {{ book.year | moment("YYYY") }}
            </v-card-actions>
            <v-card-actions>
              <v-btn color="primary" outlined @click="openEditDialog(book)">
                <span>Редактировать</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="openDeleteDialog(book)">
                <span>Удалить</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
      <v-col cols="4" v-else>
        <div class="text-h2 text-center">Книг нет</div>
      </v-col>
      <v-col cols="2">
        <v-btn class="mx-2" fab dark color="indigo" @click="openAddDialog">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <DialogDeleteBook
      v-if="currentBook.title"
      :show="deleteDialog"
      :book="currentBook"
      v-on:delete-confirm="deleteConfirm"
      v-on:delete-deny="closeDeleteDialog"
    />

    <DialogEditBook
      v-if="currentBook.title"
      :show="editDialog"
      :book="currentBook"
      v-on:edit-confirm="editConfirm"
      v-on:edit-deny="closeEditDialog"
    />

    <DialogAddBook
      :show="addDialog"
      v-on:add-confirm="addConfirm"
      v-on:add-deny="closeAddDialog"
    />
  </v-container>
</template>

<script>
import DialogDeleteBook from "@/components/dialogs/DialogDeleteBook";
import DialogEditBook from "@/components/dialogs/DialogEditBook";
import DialogAddBook from "@/components/dialogs/DialogAddBook";

export default {
  data() {
    return {
      books: [],
      authorFilter: "",
      yearFilter: "",
      deleteDialog: false,
      editDialog: false,
      addDialog: false,
      currentBook: {},
    };
  },
  components: {
    DialogDeleteBook,
    DialogEditBook,
    DialogAddBook,
  },
  methods: {
    openDeleteDialog(book) {
      this.currentBook = book;
      this.deleteDialog = true;
      // console.log(this.currentBook);
    },
    openEditDialog(book) {
      this.currentBook = book;
      this.editDialog = true;
      // console.log(this.currentBook);
    },
    openAddDialog() {
      this.addDialog = true;
    },
    closeAddDialog() {
      this.addDialog = false;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    closeEditDialog() {
      this.editDialog = false;
    },
    async deleteConfirm(id) {
      await this.$axios
        .delete(`/books/${id}`)
        .then(() => this.$toast.success("Книга успешно удалена"))
        .catch((e) => {
          console.log(e);
          this.$toast.error("Не удалось удалить книгу");
        });
      await this.getBooks();
      this.closeDeleteDialog();
    },
    async editConfirm(book) {
      await this.$axios
        .put(`/books/${book.id}`, {
          title: book.title,
          author: book.author,
          count: +book.count,
          year: book.year,
        })
        .then(() => this.$toast.success("Книга успешно обновлена"))
        .catch((e) => {
          console.log(e);
          this.$toast.error("Не удалось обновить книгу");
        });
      await this.getBooks();
      this.closeEditDialog();
    },
    async addConfirm(book) {
      await this.$axios
        .post("/books", {
          title: book.title,
          author: book.author,
          count: book.count,
          year: book.year,
        })
        .then(() => this.$toast.success("Книга успешно добавлена"))
        .catch((e) => {
          console.log(e);
          this.$toast.error("Не удалось добавить книгу");
        });
      await this.getBooks();
      this.closeAddDialog();
    },
    async getBooks() {
      const { data } = await this.$axios.get("/books").catch(() => {
        // console.log(e);
        this.$toast.error("Не удалось загрузить книни");
      });
      this.books = data;
      // console.log(this.books);
    },
    async searchForBooks() {
      await this.$axios
        .get(`/books`, {
          params: {
            author: this.authorFilter,
            year: +this.yearFilter,
          },
        })
        .then((res) => {
          this.$toast.success("Поиск выполнен");
          this.books = res.data;
        })
        .catch(() => this.$toast.error("Ошибка в запросе"));
      this.authorFilter = "";
      this.yearFilter = "";
    },
  },
  created() {
    this.getBooks();
  },
};
</script>

<style>
</style>