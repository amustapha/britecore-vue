<template>
  <div>
    <div class="columns is-multiline ">
      <div class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
            v-for="(insurance, key) in insuranceList" :key="key">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{ insurance.name }}
            </p>
          </header>
          <div class="card-content">
            <p>{{ insurance.description }}</p>
          </div>
          <footer class="card-footer">
            <router-link :to="`/${insurance.id}/submissions`" class="card-footer-item">Responses</router-link>
            <router-link :to="`/${insurance.id}`" class="card-footer-item">Open</router-link>
          </footer>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'InsuranceList',
  data () {
    return {
      insuranceList: []
    }
  },
  created () {
    const loader = this.$loading.open()
    this.$axios.get(`${this.$api}insurer/risks/`).then(response => {
      this.insuranceList = response.data
      loader.close()
    })
  }
}
</script>
<style>
.card-content p{
 overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    line-height: 1.5em;
    max-height: 7.5em;
    }
</style>
