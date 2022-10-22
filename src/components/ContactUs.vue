<template>
  <div class="row">
    <div class="col-12 col-tablet-6">
      <h2>Contact Us</h2>
      <go-card class="transparent" flat>
        <go-md
          md-options="{html: true}"
          :content="content.contact.text"
        ></go-md>
      </go-card>
    </div>
    <div class="col-12 col-tablet-6">
      <go-card card-title="Join us">
        <go-md md-options="{html: true}" :content="content.join.text"></go-md>
      </go-card>
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
