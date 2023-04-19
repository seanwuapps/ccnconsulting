<template>
  <div class="container">
    <h1>Rate calculator</h1>
    <div class="mt-4">
      <label class="mr-2">Department rate ($/hr)</label>
      <input type="number" v-model="departmentRate" />
    </div>
    <div class="mt-4">
      <label class="mr-2"
        >Margin (%) <input type="number" v-model="marginPercent" />%</label
      >
      <label class="mr-2"
        >+ Margin ($) <input type="number" v-model="marginDollar" />/hr</label
      >
    </div>

    <div class="mt-4 mb-4">
      <h4>Candidate rate</h4>
      <h4>{{ candidateRate }}</h4>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GoInput } from "@go-ui/vue";
import { defineComponent } from "vue";
</script>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      departmentRate: 100,
      marginPercent: 5,
      marginDollar: 5,
    };
  },
  computed: {
    candidateRate() {
      return (
        this.departmentRate -
        (this.departmentRate * this.marginPercent) / 100 -
        this.marginDollar
      );
    },
  },
});
</script>
