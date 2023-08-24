<script lang="ts" setup>
import { IChangelogUrls } from '@/types/general.interfaces'

const props = defineProps({
  changelogUpdates: {
    type: Boolean,
    default: false
  },
  changelogUrls: {
    type: Object as () => IChangelogUrls,
    default: () => ({})
  }
})

const hasChangelogUrls = computed(() => {
  const entriesCount = Object.keys(props.changelogUrls).length
  if (entriesCount === 0) console.error('No changelog urls provided')
  return entriesCount > 0
})

const trigger = () => {
  if (!hasChangelogUrls.value) return
  window.mitt.emit('tsxContentScreenConfig', {
    type: 'changelog',
    changelogUrl: props.changelogUrls.changelogUrl,
    changelogEndpoints: JSON.stringify({
      getChangelogs: props.changelogUrls.getChangelogs,
      postChangelog: props.changelogUrls.postChangelog
    })
  })
}
</script>

<template>
  <div
    v-if="changelogUpdates && hasChangelogUrls"
    class="changelogTrigger w-10 h-10 rounded flex items-center justify-center hover:bg-gray-100 flex-shrink-0 cursor-pointer transition duration-300 ease-in"
    @click="trigger"
  >
    <svg
      class="h-4 w-4"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.75 0H4.8125C5.8125 0 6.71875 0.53125 7.21875 1.40625L8 2.6875L8.75 1.40625C9.25 0.53125 10.1562 0 11.1562 0H11.25C12.75 0 14 1.25 14 2.75C14 3.21875 13.875 3.625 13.6875 4H15C15.5312 4 16 4.46875 16 5V7C16 7.5625 15.5312 8 15 8H1C0.4375 8 0 7.5625 0 7V5C0 4.46875 0.4375 4 1 4H2.28125C2.09375 3.625 2 3.21875 2 2.75C2 1.25 3.21875 0 4.75 0ZM5.9375 2.15625C5.6875 1.75 5.28125 1.5 4.8125 1.5H4.75C4.03125 1.5 3.5 2.0625 3.5 2.75C3.5 3.46875 4.03125 4 4.75 4H7.03125L5.9375 2.15625ZM11.25 1.5H11.1562C10.6875 1.5 10.2812 1.75 10.0312 2.15625L8.9375 4H11.25C11.9375 4 12.5 3.46875 12.5 2.75C12.5 2.0625 11.9375 1.5 11.25 1.5ZM1 9H7V16H2.5C1.65625 16 1 15.3438 1 14.5V9ZM9 16V9H15V14.5C15 15.3438 14.3125 16 13.5 16H9Z" fill="currentColor" />
    </svg>
  </div>
</template>
