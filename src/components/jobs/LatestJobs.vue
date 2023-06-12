<template>
  <div v-if="jobsStore.latest.length > 0">
    <GoCardRow
      cols="1"
      cols-tablet="1"
      cols-desktop="3"
      cols-large="3"
      heading="Latest jobs"
      more-link-href="/jobs"
      more-link-text="View all jobs">
      <JobCard :job="job" v-for="job in jobsStore.latest" />
    </GoCardRow>
  </div>
</template>

<script lang="ts" setup>
import { useJobsStore } from '@/stores/jobs.store';
import { onMounted } from 'vue';
import JobCard from './JobCard.vue';
import { GoCardRow } from '@go-ui/vue';
const jobsStore = useJobsStore();
onMounted(async () => {
  await jobsStore.fetchLatest();
});
</script>
