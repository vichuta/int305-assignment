<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  members:{
    type: Array,
    required: true
  }
});
</script>

<template>
    <h2>{{ title }}</h2>
    <div v-for="(member, index) in members" :key="member.id" class="box">
        <div>{{member.firstname}} {{member.lastname}}</div>
        <div><b>contact : </b>{{member.tel}}</div>
    </div>
</template>

<style scoped>
.box{
    border: 1px black solid;
    padding: 1.5em;
    margin: 1em;
}
</style>