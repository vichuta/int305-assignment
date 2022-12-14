<script setup>
import {ref} from 'vue'
import { collection, updateDoc, doc} from 'firebase/firestore'
import db from '../firebase/init.js'

const emit = defineEmits(['hide-edit','reload-review'])
const props = defineProps({
  menuId: {
    type: String,
    required: true,
  },
  review:{
    type:Object,
    required: true,
  }
});
console.log(props.review)
const editingReview = ref({
    comment: props.review.comment,
    reviewer: props.review.reviewer,
    stars: props.review.stars
})
async function updateReview(){
    const reviewRef = doc(db,"menus",props.menuId,"reviews",props.review.id)
    await updateDoc(reviewRef,{
      "comment": editingReview.value.comment,
      "rev_date": new Date(),
      "reviewer": editingReview.value.reviewer,
      "stars": editingReview.value.stars
    })
    console.log(editingReview.value)
    emit('hide-edit',props.review.id)
    emit('reload-review')
}

</script>

<template>
    <label for="reviewer">Name : </label>
    <input type="text" id="reviewer" v-model="editingReview.reviewer" required>
    <label for="stars"> Stars : </label>
    <input type="number" id="stars" max="5" min="0"  v-model="editingReview.stars" required>
    <label for="comment"> Comment : </label>
    <input type="text" id="comment" v-model="editingReview.comment"> 
    <button @click="updateReview()">update</button>
</template>

<style scoped>
label{
    color: orangered;
}
</style>