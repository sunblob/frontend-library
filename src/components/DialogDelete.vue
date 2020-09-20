<template>
  <div class="text-center">
      <v-dialog
      v-model="show"
      width="500"
      persistent
      >

      <v-card>
          <v-card-title>Вы действительно хотите удалить книгу?</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
              Название: {{book.name}} <br>
              Автор: {{book.author}}
          </v-card-text>
          <v-card-actions>
              <v-btn color="primary" outlined @click="denyDelete">
                  <span>Отмена</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="acceptDelete">
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
            
        }
    },
    methods: {
        acceptDelete() {
            this.$emit('delete-confirm', this.book.id)
        },
        denyDelete() {
            this.$emit('delete-deny')
        }
    }
}
</script>

<style>

</style>