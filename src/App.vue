<script lang="ts" setup>
import AppHeader from './components/feature/AppHeader/AppHeader.ce.vue'
import mitt from 'mitt'

const userPlan = 'pro'
const partnerType = 'standalone'

const userDetails = JSON.stringify({
  avatar: 'https://s.gravatar.com/avatar/f4a3c0de0d803cb634c2dc97647215a6?s=480&r=pg&d=https%3A%2F%2cdn.auth0.com&2Favatars%2Fvv.png',
  email: 'luke.skywalker@webprosss.com',
  name: 'Sascha Fuchs',
  plan: 'Trial',
  features: [
    {
      name: 'servers',
      current: 11,
      max: 10,
      threshold: 9
    },
    {
      name: 'websites',
      current: 200,
      max: 200,
      threshold: 190
    },
    {
      name: 'blocklistIpChecks',
      current: 1700,
      max: 10000,
      threshold: 9000
    }
  ]
})

const planConditions = (userPlan: string, max: string) => {
  const plans = ['lite', 'trial', 'pro', 'business', 'enterprise']
  return plans.slice(0, plans.indexOf(max)).includes(userPlan.toLowerCase())
}

const conditionBusiness = planConditions(userPlan, 'business')
const conditionPro = planConditions(userPlan, 'pro')
const conditionTrial = planConditions(userPlan, 'trial')

const userApiKeysDefault = {
  label: conditionBusiness && 'icon',
  event: conditionBusiness && 'upsell'
}

const navBlocklistDefault = {
  label: conditionPro && 'icon',
  event: conditionPro && 'upsell'
}

const navFullSiteCheckDefault = {
  label: conditionPro && 'icon',
  event: conditionPro && 'upsell'
}

const navMetricsDefault = {
  label: conditionTrial && 'icon',
  event: conditionTrial && 'upsell'
}

const navDefault = {
  fullSiteCheck: navFullSiteCheckDefault,
  metrics: navMetricsDefault,
  blocklists: navBlocklistDefault,
  alerts: {
    label: 'icon',
    event: 'upsell'
  }
}

const flags = {
  partner: {
    documentation: {
      changelog: false,
      documentation: false
    },
    user: {
      apiKeys: userApiKeysDefault,
      licenseManagement: false
    },
    company: false,
    navigation: navDefault
  },
  platform: {
    user: {
      apiKeys: userApiKeysDefault,
      licenseManagement: false
    },
    navigation: navDefault
  },
  threesixty: {
    user: {
      apiKeys: userApiKeysDefault,
      licenseManagement: false
    },
    navigation: navDefault
  },
  standalone: {
    documentation: {
      documentation: false
    },
    user: {
      apiKeys: userApiKeysDefault
    },
    company: false,
    navigation: navDefault
  }
}

const returnFlag = (partnerType: any) => {
  return JSON.stringify(flags[partnerType] || flags['platform'])
}

window.mitt = window.mitt || mitt()

window.mitt.on('tsxAppHeader', (payload) => {
  console.log('tsxAppHeader', payload)
  switch (payload.action) {
    case 'click':
      window.history.replaceState({}, '', payload.path)
      break
  }
})
</script>

<template>
  <!-- <AppHeader
    environment="prod"
    current-language="en"
    :extend-config="JSON.stringify(config)"
    :generate-base-url="true"
    :debug="true"
    :changelog-updates="true"
    model="threeSixtyNixstats"
  /> -->
  <AppHeader
    current-language="en"
    :user-details="userDetails"
    logo-src="https://cdn.discordapp.com/attachments/808000000000000000/808000000000000000/unknown.png"
    logo-path="/"
    :changelog-urls="JSON.stringify({getChangelogs: 'https://cdn.discordapp.com/attachments/808000000000000000/808000000000000000/unknown.png'})"
    :changelog-updates="true"
    :has-changelog="true"
    :flags="returnFlag(partnerType)"
    :locale-endpoint="''"
    usage="fullsitecheck"
  />
</template>

