<script setup lang="ts">
import { ru } from "yup-locales";
import { setLocale } from "yup";

setLocale(ru);
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <PrimeToast />

    <PrimeConfirmDialog />
  </div>
</template>
