<template>
  <v-container class="fill-height" ref="container" v-resize="updateListHeight">
    <v-row>
      <v-virtual-scroll
        :bench="5"
        :items="filteredPosts"
        :height="listHeight"
        item-height="61"
        v-slot:default="{ item: post }"
      >
        <PostItem
          :post="post"
          :selected="selectedPostId === post.id"
          @click.native="selectedPostId = post.id"
          @edit="toEditPost(post)"
          @delete="deletePostConfirm(post)"
        />
        <v-divider />
      </v-virtual-scroll>
    </v-row>

    <ConfirmDialog ref="confirm" />

    <v-dialog v-model="showModal" width="500" @click:outside="resetForm">
      <v-card>
        <v-card-title>{{
          isEditMode ? 'Редактирование' : 'Новый пост'
        }}</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="form.valid" @submit.prevent="savePost">
            <v-text-field
              autofocus
              v-model="form.data.name"
              label="Название"
              :rules="form.rules.name"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeModal">Отменить</v-btn>
          <v-btn color="primary" @click="savePost" :disabled="!form.valid">{{
            isEditMode ? 'Сохранить' : 'Добавить'
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PostItem from './PostItem.vue'
import ConfirmDialog from './ConfirmDialog.vue'

export default {
  name: 'PostList',
  components: {
    PostItem,
    ConfirmDialog,
  },
  data() {
    return {
      listHeight: 0,
      selectedPostId: null,
      editedPostId: null,
      showModal: false,
      form: {
        valid: true,
        data: {
          name: '',
        },
        rules: {},
      },
      isEditMode: false,
    }
  },
  computed: {
    ...mapGetters('posts', ['filteredPosts']),
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    ...mapActions('posts', [
      'fetchPosts',
      'addPost',
      'deletePost',
      'updatePost',
    ]),
    updateListHeight() {
      this.listHeight = this.$refs.container.clientHeight - 40
    },
    async deletePostConfirm(post) {
      if (
        await this.$refs.confirm.open(
          'Удаление',
          'Вы действительно хотите удалить эту запись?'
        )
      ) {
        this.deletePost(post)
      }
    },
    toEditPost(post) {
      this.isEditMode = true
      this.editedPostId = post.id
      this.form.data.name = post.name
      this.showModal = true
    },
    toAddPost() {
      this.isEditMode = false
      this.showModal = true
    },
    async savePost() {
      this.form.rules = {
        name: [
          (v) => !!v || 'Название обязательно',
          (v) =>
            (v && v.length >= 3) || 'Название должно быть не короче 2 символов',
        ],
      }

      await this.$nextTick()

      if (!this.$refs.form.validate()) {
        return
      }

      if (this.isEditMode) {
        this.updatePost({
          id: this.editedPostId,
          ...this.form.data,
        })
      } else {
        this.addPost(this.form.data)
      }

      this.closeModal()
    },
    closeModal() {
      this.showModal = false
      this.resetForm()
    },
    resetForm() {
      this.form.rules = {}
      this.$refs.form.reset()
    },
  },
}
</script>
