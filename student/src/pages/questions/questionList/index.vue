<template>
  
</template>

<script>
import { getQuestionList } from '@/api/questions'
export default {
  name: "questionList",
  data() {
    return {}
  },
  onLoad({category_id}) {
    console.log(category_id)
    getQuestionList({
      category_id: category_id
    })
  }
}
</script>

<style>

</style>