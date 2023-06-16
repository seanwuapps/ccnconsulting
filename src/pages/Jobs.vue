<template>
  <GoHero heading="Jobs">
    <p class="text-size-1">Latest contracting job openings</p>
    <!-- subscribe to job notification feature -->
    <div>
      <GoCard>
        <GoSwitch
          :checked="jobsStore.listFilters.showClosed"
          @change="handleIncludeClosedToggle"
          label="Show closed jobs"
          show-on-off
          active-label="Yes"
          inactive-label="No"></GoSwitch>
      </GoCard>
    </div>
  </GoHero>
  <div class="container mt-4">
    <GoSpinner v-if="jobsStore.fetchingList">Fetching jobs...</GoSpinner>
    <GoCardRow v-else-if="jobsStore.filteredList?.length > 0" cols="1" cols-tablet="2" cols-desktop="3" cols-large="3">
      <JobCard class="mr-2 mb-2" :job="job" v-for="job in jobsStore.filteredList" />
    </GoCardRow>
    <div v-else>
      <div class="mt-4">Sorry, we cannot find any job opening at this time. Please try again later.</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import JobCard from '@/components/jobs/JobCard.vue';
import { useJobsStore } from '@/stores/jobs.store';
import { GoCardRow, GoCard, GoHero, GoSpinner, GoSwitch } from '@go-ui/vue';
import { onMounted } from 'vue';
const jobsStore = useJobsStore();

const handleIncludeClosedToggle = async (e) => {
  jobsStore.listFilters.showClosed = e.target.checked;
};
onMounted(async () => {
  await jobsStore.fetchListing();
});
</script>
