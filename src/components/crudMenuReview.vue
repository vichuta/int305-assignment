<script setup>
import { collection, doc, deleteDoc } from 'firebase/firestore'
import db from '../firebase/init.js'

import IconStarFull from './icons/iconStarFull.vue'
import IconStarEmpty from './icons/iconStarEmpty.vue'
import IconStarHalf from './icons/iconStarHalf.vue';

import NewReview from './newReview.vue';
import EditReview from './editReview.vue'

const emit = defineEmits(['reload-query'])
const props = defineProps({
  title: {type: String,required: true},
  menus:{type: Array,required: true}
});

const formatDate = (date) => {
  let datetime = new Date(date)
  if(datetime != 'Invalid Date'){
      const date = datetime.getDate()
      const month = datetime.getMonth()
      const year = datetime.getFullYear()
      return date + '/' + month + '/' + year + ' ' 
      + datetime.toLocaleTimeString('th-TH').substring(0,5)
    }}
const showStarEmpty = (avg) =>{
  if((Math.floor(avg)-avg).toFixed(1)!=0){
    return 4-parseInt(avg)
  }else{
    return 5-parseInt(avg)
  }}
async function ReloadReview(){ emit('reload-query') }
async function removeReview(menuId,reviewId){
    const commentRef = doc(db,"menus",menuId,"reviews", reviewId)
    await deleteDoc(commentRef);
    ReloadReview()
}
const showEditMode = (index)=> {
  const indexEdit = document.getElementById(index);
  console.log(indexEdit)
  if(indexEdit.style.display == "none"){ 
    indexEdit.style.display = "block"
  }else{
    indexEdit.style.display = "none"
  }
}
</script>

<template>
    <h2>{{ title }}</h2>
    <div v-for="(menu, index) in menus" :key="menu.id" class="box">
      <h3 style="text-align: center;">{{menu.id}}</h3>
      <div><b>price : </b>{{menu.price}}</div>
      <div><b>category : </b>{{menu.category}}</div>
      <div><b>total sales : </b>{{menu.total_sales}}</div>
      <hr/>
      <!-- Review -->
      <div v-if="menu.reviews.length">
          <div class="box-reviews">
            <h4>Customer reviews</h4>
            ({{menu.avg_reviews}}) 
            <IconStarFull v-for="num in parseInt(menu.avg_reviews)"/> 
      <IconStarHalf 
          v-show="(Math.floor(menu.avg_reviews)-menu.avg_reviews).toFixed(1)!=0"/>
            <IconStarEmpty v-for="num in showStarEmpty(menu.avg_reviews)"/> 
          </div>

      <div class="box-review" v-for="(review,index) in menu.reviews" :key="review.id">
        <div style="color: green;">{{review.reviewer}}</div>
          <div>
            <IconStarFull v-for="num in parseInt(review.stars)"/> 
            <IconStarEmpty v-for="num in parseInt(5-review.stars)"/> 
            &emsp; 
              <span style="color: gray; font-size: smaller;">
                {{formatDate(review.rev_date.toDate())}}</span>
            </div>
            <div style=" font-size: small">{{review.comment}}</div>
            <button @click="removeReview(menu.id, review.id)">Delete</button>
            <button @click="showEditMode(review.id)">Edit</button>
    
            <div :id="review.id" style="display: none;">
              <EditReview :menuId="menu.id" :review="review" 
                          @hide-edit="showEditMode" @reload-review="ReloadReview"/>
          </div>
        </div>
      </div>
      <div v-else class="box-reviews">-- No reviews --</div>
      <NewReview :menuId="menu.id" @reload-review="ReloadReview"/>
        
    </div>
</template>

<style scoped>
.box{
    border: 1px solid;
    padding: 1.5em;
    margin: 1em;
    width: 100%;
}
.box-reviews{
  padding: 0.5em;
  margin: 0.5em;
  text-align: center;
}
.box-review{
  border: 1px solid;
  padding: 0.5em;
  margin: 0.5em;
}
.order-table{
  width: 100%;
}
</style>