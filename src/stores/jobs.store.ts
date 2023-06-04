import { defineStore } from 'pinia';
import Airtable from 'airtable';
import { AIRTABLE_KEY } from '../const';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const useJobsStore = defineStore('jobs', {
  state: () => {
    return {
      latest: [] as any[],
    };
  },
  actions: {
    async fetchLatest() {
      const base = new Airtable({ apiKey: AIRTABLE_KEY }).base(
        'appjb01Lr9hMbTruv'
      );

      base('Jobs')
        .select({
          // Selecting the first 3 records in Grid view:
          maxRecords: 3,
          view: 'Grid view',
          sort: [
            {
              field: 'Published date',
              direction: 'desc',
            },
          ],
        })
        .firstPage((err, records) => {
          if (!records) {
            return;
          }
          this.latest = records.map((record) => {
            const title = record.get('Title');
            const buyer = record.get('Buyer');
            const location = record.get('Location');
            const closingDateString = record.get('Closing date') as string;
            const closingDate = dayjs(closingDateString);
            const blurb =
              (record.get('Description') as string).substring(0, 100) + '...';
            const slug = record.get('Slug');
            const isClosed = closingDate.isAfter(dayjs());
            return {
              title,
              buyer,
              location,
              closingDateRelative: closingDate.toNow(),
              isClosed,
              blurb,
              slug,
            };
          });
        });
    },
  },
});
