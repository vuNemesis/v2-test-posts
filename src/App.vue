<template>
  <v-app>
    <v-app-bar app dark color="primary">
      <v-container class="pa-0">
        <v-toolbar dark flat color="primary" dense>
          <v-text-field
            v-model="postsQuery"
            dense
            rounded
            clearable
            hide-details
            filled
            single-line
            label="поиск..."
            append-icon="mdi-magnify"
          ></v-text-field>

          <v-btn
            class="ml-3"
            fab
            small
            dark
            rounded
            color="green"
            @click="doNewPost"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </v-toolbar>
      </v-container>
    </v-app-bar>

    <v-main>
      <post-list ref="postList" />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import debounce from '@/utils/debounce'
import PostList from '@/components/PostList.vue'

const QUERY_DELAY = 250

export default {
  name: 'App',

  components: {
    PostList,
  },

  data: () => ({
    items: ['Simple', 'LocalStorage', 'Supabase'],
    apiType: 'Simple',
  }),
  computed: {
    ...mapGetters('posts', ['query']),
    postsQuery: {
      get() {
        return this.query
      },
      set: debounce(function (value) {
        this.setQuery(value)
      }, QUERY_DELAY),
    },
  },
  methods: {
    ...mapActions('posts', ['setQuery']),
    setApiType(type) {
      this.apiType = type
    },
    doNewPost() {
      this.$refs.postList.toAddPost?.()
    },
  },
}
</script>
