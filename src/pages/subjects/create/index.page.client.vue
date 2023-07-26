<template>
  <section>
    <div>
      <!-- NOTE: ClientOnly is not needed here because we are using *.page.client.vue which
         sets the component to be rendered only on client side. At first, we used the ClientOnly
         but the Tabs component (which reads the document instance) is still executed for some reason.
         Currently, we will utilize this other method and keep this code below for future reference.
         TODO: find a way to render things for SEO on serverside the same way the ClientOnly's serverRendered slot
         is supposed to do for us -->
      <ClientOnly>
        <Tabs v-model="selectedTab">
          <Tab :val="'subject'" :label="'Subject'" :indicator="true"></Tab>
          <Tab :val="'courses'" :label="'Courses'" :indicator="true"></Tab>
        </Tabs>
        <TabPanels v-model="selectedTab" :animate="true">
          <TabPanel :val="'subject'" class="p-4">
            <SubjectForm></SubjectForm>
          </TabPanel>
          <TabPanel :val="'courses'">
            <p>List courses</p>
          </TabPanel>
        </TabPanels>
        <template #serverRendered>
          <p>This is for SSR/SEO</p>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Tabs, Tab, TabPanels, TabPanel } from 'vue3-tabs';
import SubjectForm from '#root/components/subject/SubjectForm.vue';
import ClientOnly from '#root/components/shared/ClientOnly.vue';
// NOTE: tried using this with v-if as well but the Tabs still executed on server side.
// const ssr = ref(import.meta.env.SSR);
const selectedTab = ref('subject');
</script>
