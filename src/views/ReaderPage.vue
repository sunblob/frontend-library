<template>
  <v-container fluid>
    <v-row justify="end">
      <v-btn class="mx-2" fab dark color="indigo" @click="openAddDialog">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row justify="center" v-if="readers.length > 0">
      <v-col cols="4">
        <div v-for="reader in readers" :key="reader.id">
          <v-card color="ma-5" hover>
            <v-card-title>{{ reader.firstName }}</v-card-title>
            <v-card-subtitle
              >{{ reader.middleName }} {{ reader.lastName }}</v-card-subtitle
            >
            <v-card-text class="text-body-1"
              >Адрес: {{ reader.address }}</v-card-text
            >
            <v-card-actions>
              <v-btn color="primary" outlined @click="openEditDialog(reader)">
                <span>Редактировать</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="openDeleteDialog(reader)">
                <span>Удалить</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row v-else justify="center" align="center">
      <v-col cols="6">
        <div class="text-h2 text-center">Читателей нет</div>
      </v-col>
    </v-row>
    <DialogAddReader
      :show="dialogAddReader"
      v-on:add-confirm="addConfirm"
      v-on:add-deny="closeAddDialog"
    />

    <DialogDeleteReader
      v-if="currentReader.firstName"
      :show="dialogDeleteReader"
      :reader="currentReader"
      v-on:delete-confirm="deleteConfirm"
      v-on:delete-deny="closeDeleteDialog"
    />

    <DialogEditReader
      v-if="currentReader.firstName"
      :show="dialogEditReader"
      :reader="currentReader"
      v-on:edit-confirm="editConfirm"
      v-on:edit-deny="closeEditDialog"
    />
  </v-container>
</template>

<script>
import DialogAddReader from "@/components/dialogs/DialogAddReader";
import DialogDeleteReader from "@/components/dialogs/DialogDeleteReader";
import DialogEditReader from "@/components/dialogs/DialogEditReader";

export default {
  components: {
    DialogAddReader,
    DialogDeleteReader,
    DialogEditReader,
  },
  data() {
    return {
      readers: [],
      currentReader: {},
      dialogAddReader: false,
      dialogDeleteReader: false,
      dialogEditReader: false,
    };
  },
  methods: {
    openDeleteDialog(reader) {
      this.currentReader = reader;
      this.dialogDeleteReader = true;
      console.log(this.currentReader);
    },
    openEditDialog(reader) {
      this.currentReader = reader;
      this.dialogEditReader = true;
      console.log(this.currentReader);
    },
    closeEditDialog() {
      this.dialogEditReader = false;
      this.currentReader = {};
    },
    closeDeleteDialog() {
      this.dialogDeleteReader = false;
    },
    openAddDialog() {
      this.dialogAddReader = true;
    },
    closeAddDialog() {
      this.dialogAddReader = false;
    },
    async deleteConfirm(id) {
      await this.$axios
        .delete(`/readers/${id}`)
        .then(() => this.$toast.success("Читатель успешно удален"))
        .catch((e) => {
          console.log(e);
          this.$toast.error("Не удалось удалить читателя");
        });
      await this.getReaders();
      this.closeDeleteDialog();
    },
    async editConfirm(reader) {
      await this.$axios
        .put(`/readers/${reader.id}`, {
          firstName: reader.firstName,
          middleName: reader.middleName,
          lastName: reader.lastName,
          address: reader.address,
        })
        .then(() => this.$toast.success("Читатель успешно обновлен"))
        .catch((e) => {
          console.log(e);
          this.$toast.error("Не удалось обновить читателя");
        });
      await this.getReaders();
      this.closeEditDialog();
    },
    async addConfirm(reader) {
      await this.$axios
        .post("/readers", {
          firstName: reader.firstName,
          middleName: reader.middleName,
          lastName: reader.lastName,
          address: reader.address,
        })
        .then(() => this.$toast.success("Читатель успешно добавлен"))
        .catch((e) => {
          console.log(e);
          this.$toast.error("Не удалось добавить читателя");
        });
      await this.getReaders();
      this.closeAddDialog();
    },
    async getReaders() {
      const { data } = await this.$axios.get("/readers").catch((error) => {
        console.log(error);
        this.$toast.error("Не удалось загрузить читателей");
      });
      this.readers = data;
      console.log(this.readers);
    },
  },
  created() {
    this.getReaders();
  },
};
</script>

<style>
</style>