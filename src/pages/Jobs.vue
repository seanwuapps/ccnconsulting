<template>
  <GoHero heading="Jobs">
    <p class="text-size-1">Latest contracting job openings</p>
    <GoSwitch
      :checked="jobsStore.listFilters.showClosed"
      @change="handleIncludeClosedToggle"
      label="Show closed jobs"
      show-on-off
      active-label="Yes"
      inactive-label="No"></GoSwitch>
    <!-- subscribe to job notification feature -->
  </GoHero>
  <div class="container">
    <GoSpinner class="mt-2" v-if="jobsStore.fetchingList">Fetching jobs...</GoSpinner>
    <div class="pt-4 pb-4" v-else-if="jobsStore.filteredList?.length > 0">
      <JobCard class="mr-2 mb-2" :job="job" v-for="job in jobsStore.filteredList" />
    </div>
    <div v-else>
      <div class="mt-4">Sorry, we cannot find any job opening at this time. Please try again later.</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import JobCard from '@/components/jobs/JobCard.vue';
import { useJobsStore } from '@/stores/jobs.store';
import { GoBanner, GoHero, GoSpinner, GoSwitch } from '@go-ui/vue';
import { onMounted } from 'vue';
const jobsStore = useJobsStore();

const handleIncludeClosedToggle = async (e) => {
  jobsStore.listFilters.showClosed = e.target.checked;
};
onMounted(async () => {
  await jobsStore.fetchListing();
});
</script>
