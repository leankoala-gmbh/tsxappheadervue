<script lang="ts" setup>
interface IUserDetails {
  avatar: string
  email: string
}
const props = defineProps({
  userDetails: {
    type: Object,
    default: () => ({})
  },
  biggerSize: {
    type: Boolean,
    default: false
  }
})

const initials = computed(() => {
  const name = props.userDetails.name || ''
  if (name.length === 0) {
    const firstLetter = props.userDetails.email.match(/[a-zA-Z]/)[0]
    return firstLetter.toUpperCase()
  }
  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
})

</script>

<template>
  <div
    class="flex items-center justify-center rounded-full shadow-sm text-white flex-shrink-0 overflow-hidden text-sm leading-leading-none font-medium"
    :class="[
      biggerSize ? 'h-12 w-12' : 'h-8 w-8',
      initials.length ? 'bg-blue-800' : ''
    ]"
  >
    <img
      v-if="userDetails.avatar"
      :src="userDetails.avatar"
      alt="user avatar"
      class="w-full block"
    >
    <template
      v-else
    >
      {{ initials }}
    </template>
  </div>
</template>
