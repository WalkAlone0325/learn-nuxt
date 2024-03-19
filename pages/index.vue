<script setup lang="ts">
import { getNowNewApi, loginApi } from '@/api/news'

const nuxtApp = useNuxtApp()
console.log('🚀:>> ', nuxtApp)

const news = ref({})
const getData = async (params) => {
  const res = await getNowNewApi(params)
  if (res.code === 200) {
    news.value = res.data
  }
}

const login = async () => {
  const res = await loginApi({
    userName: 'liqi',
    password: '123456'
  })
  if (res.code === 200) {
    setToken(res.data.token)
    navigateTo('/')
  }
}


onMounted(() => {
  getData()
})
</script>

<template>
  <div>
    home
    <button @click="login">按钮</button>
  </div>
</template>

<style lang="less" scoped></style>
