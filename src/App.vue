<script setup>
import { onMounted, ref, provide } from 'vue';
import { bitable } from '@lark-base-open/js-sdk';
import Form from './views/Form.vue';

// 移除国际化相关代码，直接使用硬编码文本
const tableInstance = ref(null);

// 提供表格实例给子组件使用
provide('tableInstance', tableInstance);

const initTable = async () => {
  try {
    // 获取表格实例
    const table = await bitable.base.getActiveTable();
    if (table) {
      tableInstance.value = table;
    }
  } catch (e) {
    console.error('获取表格失败:', e);
  }
};

onMounted(() => {
  // 使用setTimeout延迟初始化，避免与其他组件初始化冲突
  setTimeout(() => {
    initTable();
  }, 500);
});
</script>

<template>
  <main>
    <!-- 完全移除错误提示和加载状态 -->
    <Form :table="tableInstance" />
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}

:deep(.el-button--primary) {
  --el-button-bg-color: #0442d2;
  --el-button-border-color: #0442d2;
}

:deep(.el-button--text) {
  color: #0442d2;
}
</style>
