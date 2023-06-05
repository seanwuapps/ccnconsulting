<template>
  <div v-if="jobsStore.latest.length > 0">
    <h2>Latest jobs</h2>
    <div class="row mt-4">
      <div
        class="col-12 col-tablet-6 col-desktop-4"
        v-for="job in jobsStore.latest"
      >
        <JobCard :job="job" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useJobsStore } from '@/stores/jobs.store';
import { onMounted } from 'vue';
import JobCard from './JobCard.vue';
const jobsStore = useJobsStore();
onMounted(async () => {
  await jobsStore.fetchLatest();
});
</script>
