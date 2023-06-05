<template>
  <GoCard
    :card-title="job.title"
    :card-subtitle="job.buyer"
    heading-tag="h3"
    :class="{ 'job-card': true, closed: job.isClosed }">
    <div>Published on {{ job.publishedDate }}</div>
    <div v-if="!job.isClosed">
      <div>Closing {{ job.closingDateRelative }}</div>
    </div>
    <div slot="footer">
      <router-link
        v-if="!job.isClosed"
        custom
        v-slot="{ href, navigate }"
        :to="`/jobs/${job.slug}`">
        <GoButton
          variant="secondary"
          block="all"
          @click="navigate"
          :href="href">
          View job details
        </GoButton>
      </router-link>
      <div v-else>Closed</div>
    </div>
  </GoCard>
</template>

<script lang="ts">
import { GoButton, GoCard, GoIcon, GoLink } from '@go-ui/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    GoCard,
    GoButton,
    GoIcon,
    GoLink,
  },
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
});
</script>
<style lang="scss">
.job-card {
  &.closed {
    opacity: 0.4;
  }
}
</style>
