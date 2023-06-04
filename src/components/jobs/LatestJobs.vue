<template>
  <div v-if="jobsStore.latest.length > 0">
    <h2>Latest jobs</h2>
    <div class="row mt-4">
      <GoCard
        class="col-12 col-tablet-6 col-desktop-4"
        :card-title="job.title"
        :card-subtitle="job.buyer"
        heading-tag="h3"
        :href="`/jobs/${job.slug}`"
        v-for="job in jobsStore.latest"
      >
        <div>Closing {{ job.closingDateRelative }}</div>
        <div>{{ job.blurb }}</div>
      </GoCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GoCard } from '@go-ui/vue';
import { useJobsStore } from '@/stores/jobs.store';
const jobsStore = useJobsStore();
</script>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  async mounted() {
    await this.jobsStore.fetchLatest();
  },
});
</script>
