<template>
  <section>
    <div>
      <ClientOnly>
        <Tabs v-model="selectedTab">
          <Tab :val="'subject'" :label="'Subject'" :indicator="true"></Tab>
          <Tab :val="'courses'" :label="'Courses'" :indicator="true"></Tab>
        </Tabs>
        <TabPanels v-model="selectedTab" :animate="true">
          <TabPanel :val="'subject'">
            <form @submit.prevent="onSubmit()">
              <p>Make subject form</p>
            </form>
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
import useVuelidate from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';

import { Tabs, Tab, TabPanels, TabPanel } from 'vue3-tabs';
import { BaseButton, BaseCheckbox, BaseInput } from '#root/components/base';
import ClientOnly from '#root/components/shared/ClientOnly.vue';
import { SubjectForm, SubjectFormValidator } from '#root/common/dto/subject-form.interface';

// #region Form
const form = reactive<SubjectForm>({
  title: '',
  isPublished: false,
});

const rules: SubjectFormValidator = {
  title: { required, maxLength: maxLength(12) },
};

const v$ = useVuelidate(rules, form, { $lazy: true });

async function onSubmit() {}
// #endregion Form

// #region Tabs
const selectedTab = ref('subject');
// #endregion Tabs
</script>
