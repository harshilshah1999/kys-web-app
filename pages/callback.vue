<template>
  <div>callback</div>
</template>

<script>
export default {
  mounted() {
    for (let i = 0; i < 200; ++i) console.log(i);
  },
};
</script>

<style>
</style>