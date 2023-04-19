<template>
  <div class="row">
    <div class="col-12 col-tablet-6">
      <h2>Contact Us</h2>
      <GoMd md-options="{html: true}" :content="content.contact.text"></GoMd>
      <h3 class="mt-5">Join us</h3>
      <GoMd md-options="{html: true}" :content="content.join.text"></GoMd>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { GoMd } from "@go-ui/vue";
import content from "../content";
</script>
<style scoped>
.transparent {
  background: transparent;
}
</style>
