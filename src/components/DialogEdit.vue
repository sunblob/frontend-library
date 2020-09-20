<template>
  <div class="text-center">
      <v-dialog
      v-model="show"
      width="500"
      persistent
      >

      <v-card>
          <v-card-title>Редактирование книги</v-card-title>
          <v-divider></v-divider>
          <v-container>
              <v-form>
              <v-text-field v-model="name" label="Название"></v-text-field>
              <v-text-field v-model="author" label="Автор"></v-text-field>
              <v-row justify="center">
                  <v-date-picker v-model="year"></v-date-picker>
              </v-row>
          </v-form>
          </v-container>
          <v-card-actions>
              <v-btn color="primary" outlined @click="denyEdit">
                  <span>Отмена</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="acceptEdit">
                  <span>Удалить</span>
              </v-btn>
          </v-card-actions>
      </v-card>
    
      </v-dialog>
  </div>
</template>

<script>
export default {
    props: ['show', 'book'],
    data() {
        return {
            editedBook: null,
            name: '',
            author: '',
            year: '2020-06-28'
        }
    },
    methods: {
        acceptEdit() {
            this.editedBook = { ...this.book, name: this.name, author: this.author, year: this.year }
            this.$emit('edit-confirm', this.editedBook)
        },
        denyEdit() {
            this.$emit('edit-deny')
        }
    },
    mounted() {
        this.name = this.book.name
        this.author = this.book.author
    }
}
</script>

<style>

</style>