<template>
  <main class="home-page">
    <section class="container mx-auto p-4">
      <h1 class="text-2xl mb-8">Latest Posts</h1>
      <div class="grid gap-4">
        <PostCard v-for="(post, i) in posts" :key="i" :post="post" />
      </div>
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
      store.dispatch('FetchPosts', 3);
      const query = '*[_type == "post"]';

      subscription.value = sanity.listen(query).subscribe((update) => {
        switch (update.transition) {
          case 'update':
            console.log('Post Updated', update);
            break;
          case 'appear':
            console.log('Post Appeared', update);
            break;
          case 'disappear':
            console.log('Post Disappeared', update);
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
