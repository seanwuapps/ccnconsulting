<template>
  <go-footer dark>
    <div class="container pt-5 pb-5">
      <div class="row align-items-center">
        <div class="col-tablet-4 col-desktop-8">
          <go-md :content="content.footer.copyright"></go-md>
        </div>
        <div class="col-tablet-8 col-desktop-4">
          <p class="abn">
            <strong class="mr-2">ABN</strong>
            <span>{{ content.abn }}</span>
          </p>
        </div>
      </div>
    </div>
  </go-footer>
</template>
<script setup lang="ts">
import { GoMd } from '@go-ui/vue';
import content from '../content';
</script>
<style lang="scss">
@import '@go-ui/core/src/global/scss/utils';
.abn {
  text-align: start;
  @include tablet {
    text-align: end;
  }
}
</style>
