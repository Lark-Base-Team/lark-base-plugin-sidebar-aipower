<template>
  <el-dropdown @command="handleCommand">
    <span class="language-switch">
      {{ currentLanguage }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@element-plus/icons-vue'

const { locale } = useI18n()

const currentLanguage = computed(() => {
  return locale.value === 'zh' ? '中文' : 'English'
})

const handleCommand = (command: string) => {
  locale.value = command
}
</script>

<style scoped>
.language-switch {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
}
</style> 