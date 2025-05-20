<template>
  <div class="flex flex-col font-medium min-h-screen">
    <div class="flex justify-between py-5">
      <ECNHeader class="grow mx-auto" />
    </div>

    <div class="grow">
      <NuxtRouteAnnouncer />

      <NuxtPage />
    </div>

    <ECNFooter />
  </div>
</template>
