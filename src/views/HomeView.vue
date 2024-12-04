<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-200 dark:bg-slate-900">
    <header class="w-full bg-white dark:bg-slate-800 py-4">
      <nav class="container mx-auto px-6 flex justify-between items-center">
        <a href="#" class="text-2xl font-bold text-slate-800 dark:text-slate-200">
          RBAC Admin
        </a>

        <div class="space-x-4 flex items-center">
          <RouterLink asChild to="/auth/login" class="text-slate-800 dark:text-slate-200 hover:underline">
            <BaseButton label="Login" variant="secondary" />
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="flex-grow container mx-auto px-6 py-12">
      <section class="text-center space-y-6">
        <h1 class="text-4xl font-bold text-slate-800 dark:text-slate-200">
          Welcome to RBAC Admin!
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">
          Explore our platform and discover amazing features tailored for you.
        </p>
        <div class="mt-6">
          <BaseButton label="Get Started" variant="primary" class="mx-auto" @click="$router.push('/auth/register')" />
        </div>
      </section>

      <section class="mt-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center">
            <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">Simplicity</h3>
            <p class="text-slate-600 dark:text-slate-400 mt-2">
              Easy to use and designed for everyone.
            </p>
          </div>
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center">
            <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">Functionality</h3>
            <p class="text-slate-600 dark:text-slate-400 mt-2">
              Packed with features to enhance your experience.
            </p>
          </div>
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center">
            <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">Support</h3>
            <p class="text-slate-600 dark:text-slate-400 mt-2">
              We're here to help you succeed every step of the way.
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-white dark:bg-slate-800 py-6">
      <div class="container mx-auto px-6 text-center">
        <p class="text-slate-600 dark:text-slate-400">
          Made with 💝 by <a href="https://github.com/wtricks" class="hover:underline">Anuj Kumar</a>
        </p>
        <p class="text-slate-600 dark:text-slate-400 mt-2">
          © 2024 MyWebsite. All Rights Reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
