<template>
  <main class="home-page">
    <section class="container mx-auto p-4">
      <h1 class="text-2xl mb-8">Latest Posts</h1>
      <div class="grid gap-4">
        <!-- PostCard -->
        <PostCard v-for="(post, i) in posts" :key="i" :post="post" />
      </div>
      <button
        v-if="$store.state.total_posts > posts.length"
        @click="$store.dispatch('LoadMorePosts', 1)"
        class="btn mt-8"
      >
        Load More({{ $store.state.total_posts - posts.length }})
      </button>
    </section>
  </main>
</template>

<script>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import sanity from '../client';
import PostCard from '../components/PostCard';

export default {
  components: {
    PostCard,
  },

  setup() {
    const subscription = ref(null);
    const store = useStore();

    const posts = computed(() => store.getters.posts);

    onMounted(() => {
      store.dispatch('FetchPosts', 2);
      const query = '*[_type == "post"]';

      subscription.value = sanity.listen(query).subscribe((update) => {
        switch (update.transition) {
          case 'update':
            sanity.getDocument(update.result.author._ref).then((author) => {
              store.dispatch('UpdatePost', {
                ...update.result,
                author,
              });
            });

            break;

          case 'appear':
            sanity.getDocument(update.result.author._ref).then((author) => {
              store.dispatch('AddNewPost', {
                ...update.result,
                author,
              });
            });

            break;
          case 'disappear':
            store.dispatch('RemovePost', update.documentId);
            break;
        }
      });
    });
    onUnmounted(() => {
      subscription.value.unsubscribe();
    });
    return {
      posts,
    };
  },
};
</script>
