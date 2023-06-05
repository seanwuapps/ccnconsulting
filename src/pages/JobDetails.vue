<template>
  <div v-if="jobStore.fetchingDetails" class="text-center mt-4 mb-4">
    <GoSpinner>Fetching job details...</GoSpinner>
  </div>
  <div v-else>
    <div v-if="job">
      <GoHero :heading="job.title" />
    </div>
    <div class="container" v-else>
      <p>Sorry, we do not have the details for this job.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { GoHero, GoSpinner } from '@go-ui/vue';
import { useJobsStore } from '@/stores/jobs.store';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const jobStore = useJobsStore();
    return { jobStore };
  },
  components: { GoHero, GoSpinner },
  watch: {
    '$route.params.slug': {
      immediate: true,
      handler(slug) {
        this.jobStore.fetchJob(slug);
      },
    },
  },
  computed: {
    job() {
      return this.jobStore.currentJob;
    },
  },
});
</script>

<style scoped></style>
