<script setup>
import {ref} from 'vue'
import { collection, addDoc, deleteDoc } from 'firebase/firestore'
import db from '../firebase/init.js'

const emit = defineEmits(['reload-review'])
const props = defineProps({
  menuId: {type: String,required: true,}
});
const newReview = ref({})
async function addReview(){
    const reviewRef = collection(db,"menus",props.menuId,"reviews")
    await addDoc(reviewRef,{
      comment: newReview.value.comment,
      rev_date: new Date(),
      reviewer: newReview.value.reviewer,
      stars: newReview.value.stars
    })
    newReview.value = {}
    emit('reload-review')
}
</script>

<template>
    <label for="reviewer">Name : </label>
    <input type="text" id="reviewer" v-model="newReview.reviewer" required>
    <label for="stars"> Stars : </label>
    <input type="number" id="stars" max="5" min="0" 
      v-model="newReview.stars" required>
    <label for="comment"> Comment : </label>
    <input type="text" id="comment" v-model="newReview.comment"> 
    <button @click="addReview()">Add review</button>
</template>

<style scoped>
label{
    color: dodgerblue;
}
</style>