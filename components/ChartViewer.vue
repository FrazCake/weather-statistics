<template>
  <v-card v-bind="$attrs" class="mx-auto" v-on="$listeners">
    <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="400px"></v-img> -->
    <v-card-title> {{ title }} </v-card-title>
    <v-card-text>
      <BarChart :data="chartData" :labels="labels" />
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" text> Settings </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="showSettings = !showSettings">
        <v-icon>{{ showSettings ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showSettings">
        <v-divider></v-divider>

        <v-card-text> Settings </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    chartData: {
      type: Array,
      default: () => [],
    },
    labels: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    showSettings: false,
  }),
};
</script>
