<template>
  <div v-if="jobsStore.latest.length > 0">
    <go-heading-row heading="Latest jobs" more-link-href="/jobs" more-link-text="View all jobs"></go-heading-row>
    <div class="row mt-4">
      <div class="col-12 col-tablet-6 col-desktop-4" v-for="job in jobsStore.latest">
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
