<template>
  <v-container grid-list-xs>
    <h1>WEATHER STATISTICS</h1>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="py-4 d-flex justify-center mb-6">
          <CompanyLogo />
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="chartProps in chartList" :key="chartProps.name" cols="12" lg="6">
        <ChartViewer :title="chartProps.name" :chart-data="chartProps.data" />
      </v-col>
    </v-row>
    <pre>{{ chartList }}</pre>
  </v-container>
</template>

<script>
import weatherService from '../services/weather.service';

const mockLongitude = 12.4823;
const mockLatitude = 41.8955;

export default {
  name: 'IndexPage',
  async asyncData() {
    // eslint-disable-next-line no-useless-catch
    try {
      const weatherInfo = await weatherService.getWeatherInfo(mockLongitude, mockLatitude, 2);
      const chartList = [
        { name: 'Temperature', data: weatherInfo.temperatureData },
        { name: 'Precipitations', data: weatherInfo.precipitationData },
      ];
      return { chartList };
    } catch (error) {
      // TODO redirect to error page or show an error message
      throw error;
    }
  },
};
</script>
