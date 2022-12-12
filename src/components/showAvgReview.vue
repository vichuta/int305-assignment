<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  avg:{
    type: Number,
    required: true
  }
});
</script>

<template>
  <h2>{{ title }}</h2>
  <p>{{avg}}</p>
</template>

<style scoped></style>