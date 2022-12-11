<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  data:{
    type: Number,
    required: true
  }
});
</script>

<template>
  <h2>{{ title }}</h2>
  <p>{{data}}</p>
</template>

<style scoped></style>