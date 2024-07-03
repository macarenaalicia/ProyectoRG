<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field v-model="searchQuery" label="Buscar país" @keyup.enter="searchCountries" clearable></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select v-model="selectedRegion" :items="availableRegions" label="Seleccionar región"
                  :disabled="!availableRegions.length" :hint="!availableRegions.length ? 'No hay regiones disponibles' : ''"
                  clearable></v-select>
      </v-col>
      <v-col cols="12" sm="4" class="d-flex align-center">
        <v-btn variant="tonal" color="primary" @click="searchCountries">Buscar</v-btn>
        <v-btn variant="tonal" color="secondary" @click="resetFilters" class="ml-2">Limpiar</v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn icon @click="toggleView">
          <v-icon>{{ isGridView ? 'mdi-view-grid' : 'mdi-view-list' }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <CountriesList :countries="filteredCountries" :isGridView="isGridView" />
  </v-container>
</template>

<script>
import { fetchAllCountries } from '@/services/apiService';
import CountriesList from './CountriesList.vue';

export default {
  components: {
    CountriesList
  },
  data() {
    return {
      // Cadena de búsqueda para filtrar países
      searchQuery: '',
      // Región seleccionada para filtrar países
      selectedRegion: '',
      // Lista de todos los países
      countries: [],
      // Lista de países filtrados según los criterios de búsqueda
      filteredCountries: [],
      // Lista de regiones disponibles
      availableRegions: [],
      // Estado de la vista (true: cuadrícula / false: lista)
      isGridView: true
    };
  },
  methods: {
    // Método asincrónico para obtener todos los países
    async fetchCountries() {
      try {
        const countries = await fetchAllCountries();
        this.setCountriesData(countries);
      } catch (error) {
        console.error('Error obteniendo paises:', error);
      }
    },
    // Método para establecer los datos de los países y actualizar regiones disponibles
    setCountriesData(countries) {
      this.countries = countries;
      this.filteredCountries = countries;
      // Actualiza la lista de regiones disponibles de los paises
      this.updateAvailableRegions(countries);
    },
    // Método para buscar países según los criterios de búsqueda
    searchCountries() {
      // Filtra los países según los criterios y asigna el resultado a filteredCountries
      this.filteredCountries = this.countries.filter(this.matchesSearchCriteria);
      // Actualiza la lista de regiones disponibles basada en los países filtrados
      this.updateAvailableRegions(this.filteredCountries);
    },
    // Método para verificar si un país cumple con los criterios de búsqueda
    matchesSearchCriteria(country) {
      // Verifica si el nombre del país coincide con la búsqueda
      const matchesName = country.name.common.toLowerCase().includes(this.searchQuery.toLowerCase());
      // Verifica si el país pertenece a la región seleccionada
      const matchesRegion = this.selectedRegion ? country.region === this.selectedRegion : true;
      // Retorna verdadero si el país cumple con ambos criterios
      return matchesName && matchesRegion;
    },
    // Método para resetear los filtros y obtener nuevamente todos los países en la vista
    async resetFilters() {
      this.searchQuery = '';
      this.selectedRegion = '';
      await this.fetchCountries();
    },
    // Método para actualizar la lista de regiones disponibles
    updateAvailableRegions(countries) {
      const regions = countries.map(country => country.region);
      this.availableRegions = [...new Set(regions)];
    },
    // Método para alternar entre vista de cuadrícula y vista de lista
    toggleView() {
      this.isGridView = !this.isGridView;
    }
  },
  async created() {
    await this.resetFilters();
  }
};
</script>

<!--Cambia el cursor a un puntero cuando se pasa sobre una tarjeta-->
<style scoped>
  .v-card {
    cursor: pointer;
  }
</style>
