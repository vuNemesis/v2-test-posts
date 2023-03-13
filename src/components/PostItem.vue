<template>
  <v-hover v-slot="{ hover }">
    <v-list-item
      :key="post.id"
      :class="{ item: true, item_selected: selected }"
    >
      <v-list-item-content>
        <v-list-item-title>{{ post.name }}</v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn
          icon
          :color="
            hover || $vuetify.breakpoint.mobile || selected
              ? 'primary'
              : 'transparent'
          "
          @click="$emit('edit')"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-list-item-action>

      <v-list-item-action class="ml-2">
        <v-btn
          icon
          :color="
            hover || $vuetify.breakpoint.mobile || selected
              ? 'red'
              : 'transparent'
          "
          @click="$emit('delete')"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-hover>
</template>

<script>
export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.item {
  transition: background 150ms;
}
.item:hover {
  background: #e3f2fd;
}
.item_selected {
  background: #e3f2fd;
}
</style>
