<template>
  <div class="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex row">
    <img v-if="post.image" src="" alt="" />
    <div class="flex-1 flex flex-col">
      <h3 class="text-lg md:text-2xl font-bold mb-4">{{ post.title }}</h3>

      <p class="text-gray-500 md:text-lg mb-4 flex-1">{{ post.excerpt }}</p>

      <div
        class="flex sm:flex-col md:flex-row justify-between items-start md-items-end"
      >
        <div class="flex items-center sm:mb-4 md:mb-0">
          <img v-if="post.author.avatar" src="" alt="" />
          <div>
            <p class="text-white mr-4">
              {{ post.author.full_name }}
            </p>
            <p class="text-gray-500 text-sm">
              {{ post._createdAt }}
            </p>
          </div>
        </div>

        <router-link :to="`/post/${post._id}`" class="btn">
          Read more
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
