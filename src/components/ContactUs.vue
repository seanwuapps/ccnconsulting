<template>
  <div class="row">
    <div class="col-12 col-tablet-6">
      <h2>Contact Us</h2>
      <go-md md-options="{html: true}" :content="content.contact.text"></go-md>
      <h3 class="mt-5">Join us</h3>
      <go-md md-options="{html: true}" :content="content.join.text"></go-md>
    </div>
  </div>
</template>
<script lang="ts" setup>
import content from "../content";
</script>
<style scoped>
.transparent {
  background: transparent;
}
</style>
