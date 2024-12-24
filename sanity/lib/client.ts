import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
// })

export const client = createClient({
  projectId: "zatwz31j",  // Replace with your Sanity project ID
  dataset: "production",         // Your dataset name
  apiVersion: "2024-12-01 ",      // Specify the API version you're using
  useCdn: true,                  // Use CDN for faster responses (true/false)
});