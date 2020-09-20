<template>
  <v-container>
      <v-row  justify="center">
          <v-col cols="6">
            <div v-for="book in books" :key="book.id">
                <v-card color="ma-5" hover>
                    <v-card-title>{{book.name}}</v-card-title>
                    <v-card-subtitle>{{book.author}}</v-card-subtitle>
                    <v-card-actions>
                        Количество книг: {{book.count}} 
                        <v-spacer></v-spacer>
                        Год издания: {{book.year | moment('DD.MM.YYYY')}}
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
      </v-row>
      <DialogDelete 
        :show="deleteDialog" 
        :book="currentBook"
        v-on:delete-confirm="deleteConfirm"
        v-on:delete-deny="closeDeleteDialog"/>

      <DialogEdit 
        :show="editDialog"
        :book="currentBook"
        v-on:edit-confirm="editConfirm"
        v-on:edit-deny="closeEditDialog"
      />
  </v-container>
</template>

<script>
import DialogDelete from '@/components/DialogDelete'
import DialogEdit from '@/components/DialogEdit'

export default {
    data() {
        return {
            books: [],
            deleteDialog: false,
            editDialog: false,
            currentBook: {
                name: 'Placeholer',
                author: 'Placeholder',
                count: 0,
                year: new Date()
            }
        }
    },
    components: {
        DialogDelete,
        DialogEdit
    },
    methods: {
        openDeleteDialog(book) {
            this.currentBook = book
            this.deleteDialog = true
            console.log(this.currentBook)
        },
        openEditDialog(book) {
            this.currentBook = book
            this.editDialog = true
            console.log(this.currentBook)
        },
        closeDeleteDialog() {
            this.deleteDialog = false
        },
        closeEditDialog() {
            this.editDialog = false
        },
        async deleteConfirm(id) {
            try {
               await this.$axios.delete(`/books/${id}`) 
               await this.getBooks()
               this.closeDeleteDialog()
            } catch (error) {
                console.log(error)
            }
        },
        async editConfirm(book) {
            const result = await this.$axios.put(`/books/${book.id}`, {
                name: book.name,
                author: book.author,
                year: book.year
            })
            console.log(result)
        },
        async getBooks() {
            try {
                const {data} = await this.$axios.get('/books/getAllBooks')
                this.books = data
                console.log(this.books)
            } catch (error) {
                console.log(error)
            }
        }
    },
    created() {
        this.getBooks()
    }
};
</script>

<style>
</style>