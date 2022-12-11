<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    reqired: true,
  }
});
</script>

<template>
  <h2>{{ title }}</h2>
  <ol>
    <li v-for="(doc, index) in data" :key="doc.id">{{doc.state}}, {{ doc.city }} ({{ doc.zip }}) | pop : {{doc.pop}}</li>
  </ol>
</template>

<style scoped></style>
