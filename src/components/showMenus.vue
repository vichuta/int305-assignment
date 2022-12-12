<script setup>
import IconStarFull from './icons/iconStarFull.vue'
import IconStarEmpty from './icons/iconStarEmpty.vue'
import IconStarHalf from './icons/iconStarHalf.vue';
defineProps({
  title: {
    type: String,
    required: true,
  },
  menus:{
    type: Array,
    required: true
  }
});

const formatDate = (date) => {
  let datetime = new Date(date)
  if(datetime != 'Invalid Date'){
      const date = datetime.getDate()
      const month = datetime.getMonth()
      const year = datetime.getFullYear()
      return date + '/' + month + '/' + year + ' ' + datetime.toLocaleTimeString('th-TH').substring(0,5)
    }
}
const showStarEmpty = (avg) =>{
  if((Math.floor(avg)-avg).toFixed(1)!=0){
    return 4-parseInt(avg)
  }else{
    return 5-parseInt(avg)
  }
}
</script>

<template>
    <h2>{{ title }}</h2>
    <div v-for="(menu, index) in menus" :key="menu.id" class="box">
        <h3 style="text-align: center;">{{menu.id}}</h3>
        <div><b>price : </b>{{menu.price}}</div>
        <div><b>category : </b>{{menu.category}}</div>
        <hr/>
        <!-- Review -->
        <div v-if="menu.reviews.length">
          <div class="box-reviews">
            <h4>Customer reviews</h4>
            ({{menu.avg_reviews}}) <IconStarFull v-for="num in parseInt(menu.avg_reviews)"/> 
            <IconStarHalf v-show="(Math.floor(menu.avg_reviews)-menu.avg_reviews).toFixed(1)!=0"/>
              <IconStarEmpty v-for="num in showStarEmpty(menu.avg_reviews)"/> 
          </div>

          <div class="box-review" v-for="(review) in menu.reviews" :key="review.id">
            <div style="color: green;">{{review.reviewer}}</div>
            <div>
              <IconStarFull v-for="num in parseInt(review.stars)"/> 
              <IconStarEmpty v-for="num in parseInt(5-review.stars)"/> 
              &emsp; <span style="color: gray; font-size: smaller;">{{formatDate(review.rev_date.toDate())}}</span></div>
            <div style=" font-size: small">{{review.comment}}</div>
          </div>
        </div>
        <div v-else class="box-reviews">-- No reviews --</div>
        
        
     
        <!-- <table border="1" v-if="menu.reviews.length" class="order-table">
          <tr>
            <th>username</th>
            <th>comment</th>
            <th>date</th>
            <th>stars</th>
          </tr>
          <tr v-for="(review) in menu.reviews" :key="review.id">
            <td>{{review.reviewer}}</td>
            <td>{{review.comment}}</td>
            <td>{{formatDate(review.rev_date.toDate())}}</td>
            <td>{{review.stars}}</td>
          </tr>
        </table>
        <div v-else>-- no reviews --</div> -->
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