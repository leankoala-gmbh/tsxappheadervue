<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useLinkHelper } from '@/composables/navigation'
import { translator } from '@/composables/translator'
import { IConfigNavigationDetails, TApplication } from '@/types/general.interfaces'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import IconsUserMenu from '@/components/pure/IconsUserMenu/IconsUserMenu.vue'

const props = defineProps({
  changelogUpdates: {
    type: Boolean,
    default: false
  },
  userDetails: {
    type: Object,
    default: () => ({})
  },
  navEntries: {
    type: Array as () => IConfigNavigationDetails[],
    default: () => []
  },
  usage: {
    type: String as () => TApplication,
    default: ''
  }
})

const { clickLink, labelStyle } = useLinkHelper(props.usage)

const userPlan = computed(()=> {
  return props.userDetails.plan.split(' ')
    .map((word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ')
})

const shortenStringEllips = (text = '') => {
  const customSize = 26
  if (text.length <= customSize) return text
  return text.slice(0, customSize) + '...'
}

const name = computed(()=> shortenStringEllips(props.userDetails.name))
const email = computed(()=> shortenStringEllips(props.userDetails.email))
const user = computed(() => {
  return {
    name: name.value,
    email: email.value
  }
})

</script>

<template>
  <Menu
    as="div"
    class="ml-3 relative hover:bg-app-hover justify-end flex items-center rounded h-10"
  >
    <MenuButton>
      <div class="flex items-center gap-2 cursor-pointer h-10">
        <UserAvatar
          v-if="Object.keys(userDetails).length"
          :user-details="userDetails"
        />
        <svg
          class="w-4 text-app-chevron"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        ><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z" /></svg>
      </div>
    </MenuButton>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        v-if="navEntries.length"
        class="origin-top-right absolute right-0 top-[55px] rounded-md shadow-lg bg-dropdown-background ring-1 ring-black ring-opacity-5 focus:outline-none w-[340px] pb-2"
      >
        <div
          v-for="item in navEntries"
          :key="item.id"
          class="flex text-dropdown-text px-2"
          :class="[
            item.isActive ? 'bg-gray-200': '',
            item.type === 'seperator' ? 'border-b border-gray-200 h-1 py-0' : '',
          ]"
        >
          <div
            v-if="userDetails.plan?.length && item.type === 'planName'"
            class="font-medium mb-2 text-secondary mt-2 px-2"
          >
            {{ t(userPlan) }}
          </div>
          <div
            v-if="item.type === 'accountFeatures' && userDetails.features?.length "
            class="flex gap-1 flex-col w-full px-2"
          >
            <div
              v-for="(feature, index) in userDetails.features"
              :key="index"
              class="rounded px-2 py-1 flex justify-between items-center text-sm cursor-pointer"
              :class="[
                feature.current >= feature.threshold ? 'bg-red-100 text-red-700' : ''
              ]"
              @click="clickLink({id: `feature-${feature.name}`}, $event)"
            >
              <span>{{ t(feature.name) }}</span>
              <span>{{ t('countOf', {c: String(feature.current), m: String(feature.max)}) }}</span>
            </div>
          </div>
          <div
            v-if="item.type === 'userInfo'"
            class="flex gap-4 mb-2 px-2 pt-4"
          >
            <UserAvatar :user-details="userDetails" :bigger-size="true" />
            <div>
              <div v-if="user.name?.length" class="font-bold">
                {{ user.name }}
              </div>
              <div v-if="user.email?.length" class="text-sm">
                {{ user.email }}
              </div>
            </div>
          </div>
          <a
            v-if="item.type === 'link'"
            class="py-2 my-1 mx-1 px-2 text-sm cursor-pointer text-dropdown-text hover:bg-dropdown-hoverBackground hover:text-dropdown-hoverText transition ease-in-out duration-150  flex items-center rounded w-full"
            @click.stop="clickLink(item, $event)"
          >
            <IconsUserMenu
              v-if="item.icon"
              class="w-4 opacity-60"
              :icon="item.icon"
            />
            <span
              class="ml-2"
            >{{ translator(item.id) }}</span>
            <span
              v-if="item.label"
              class="ml-2 rounded-full p-[2px] text-xs font-semibold uppercase leading-none relative flex items-center justify-center h-4 w-4"
              :class="labelStyle(item)"
            >
              <Icon
                v-if="item.label === 'icon'"
                icon="ic:baseline-star"
                class="w-4"
              />
              <span v-else>{{ t(item.label) }}</span>
            </span>
          </a>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
