<template>
  <div class="container">
    <GoInput type="text" label="Candidate rate">
      <div slot="suffix">$/hr</div>
    </GoInput>
  </div>
</template>

<script lang="ts" setup>
import { GoInput } from "@go-ui/vue";
</script>
