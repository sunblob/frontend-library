<template>
    <v-app-bar app color="primary" dark>
      <v-btn :to="{ name: 'Book' }" outlined>
        <span class="mr-2">Книги</span>
      </v-btn>

      <v-btn :to="{ name: 'Reader' }" class="ml-2" outlined>
        <span class="mr-2">Читатели</span>
      </v-btn>
      
      <v-spacer></v-spacer>

      
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>