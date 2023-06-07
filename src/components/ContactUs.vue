<template>
  <h2>Contact us</h2>
  <div>
    <GoMd md-options="{html: true}" :content="content.contact.text"></GoMd>

    <h3 class="mt-5">Work with us</h3>
    <GoMd md-options="{html: true}" :content="content.join.text"></GoMd>
  </div>
</template>
<script lang="ts" setup>
import { GoMd } from '@go-ui/vue';
import content from '../content';
</script>
<style scoped>
.transparent {
  background: transparent;
}
</style>
