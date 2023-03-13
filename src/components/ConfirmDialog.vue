<template>
  <v-dialog v-model="opened" :max-width="options.width" persistent>
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message" class="pa-4 text-body-1 black--text">{{
        message
      }}</v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="cancel">Нет</v-btn>
        <v-btn color="primary" @click="agree">Да</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDlg',
  data() {
    return {
      opened: false,
      resolve: null,
      message: null,
      title: null,
      options: {
        color: 'grey lighten-3',
        width: 400,
      },
    }
  },

  methods: {
    open(title, message, options) {
      this.opened = true
      this.title = title
      this.message = message
      this.options = { ...this.options, ...options }

      return new Promise((resolve) => {
        this.resolve = resolve
      })
    },
    agree() {
      this.resolve(true)
      this.opened = false
    },
    cancel() {
      this.resolve(false)
      this.opened = false
    },
  },
}
</script>
