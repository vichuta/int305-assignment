<script setup>
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
</script>

<template>
    <h2>{{ title }}</h2>
    <div v-for="(menu, index) in menus" :key="menu.id" class="box">
        <h4>{{menu.id}}</h4>
        <div><b>category : </b>{{menu.category}}</div>
        <div><b>price : </b>{{menu.price}}</div>
        <hr/>
        <h5>reviews</h5>
        <table border="1" v-if="menu.reviews.length">
          <tr>
            <th>username</th>
            <th>comment</th>
            <th>date</th>
            <th>stars</th>
          </tr>
          <tr v-for="(review) in menu.reviews" :key="review.id">
            <td>{{review.reviewer}}</td>
            <td>{{review.comment}}</td>
            <td>{{review.rev_date.toDate()}}</td>
            <td>{{review.stars}}</td>
          </tr>
        </table>
        <div v-else>-- no reviews --</div>
    </div>
</template>

<style scoped>
.box{
    border: 1px black solid;
    padding: 1.5em;
    margin: 1em;
}
</style>