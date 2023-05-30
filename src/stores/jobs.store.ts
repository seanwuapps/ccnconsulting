import { defineStore } from 'pinia';
import Airtable from 'airtable';
import { AIRTABLE_KEY } from '../const';

export const useJobsStore = defineStore('jobs', {
  state: () => {
    return {
      currentJobs: [],
    };
  },
  actions: {
    async fetchJobs() {
      const base = new Airtable({ apiKey: AIRTABLE_KEY }).base(
        'appjb01Lr9hMbTruv'
      );

      base('Jobs')
        .select({
          // Selecting the first 3 records in Grid view:
          maxRecords: 3,
          view: 'Grid view',
        })
        .eachPage(
          function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function (record) {
              console.log('Retrieved', record.get('RFQ ID'));
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
    },
  },
});
