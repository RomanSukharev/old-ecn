<template>
  <div class="w-100 h-screen flex overflow-hidden">
    <ECNMenu class="w-44 shrink-0" />

    <div class="flex flex-col grow overflow-hidden">
      <slot />
    </div>
  </div>
</template>
