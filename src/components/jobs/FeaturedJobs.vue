<template>
  <section>
    <h2>Featured jobs</h2>
  </section>
</template>

<script lang="ts" setup>
import { useJobsStore } from '@/stores/jobs.store';
const jobsStore = useJobsStore();

await jobsStore.fetchJobs();
</script>
