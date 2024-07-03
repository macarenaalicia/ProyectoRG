<template>
  <v-container>
    <v-row>
      <v-col
        v-for="country in countries"
        :key="country.cca3"
        :cols="12"
        :sm="isGridView ? 6 : 12"
        :md="isGridView ? 4 : 12"
        :lg="isGridView ? 3 : 12"
      >
        <v-card variant="tonal" @click="selectCountry(country)" class="mb-3">
          <v-card-title>{{ country.name.common }}</v-card-title>
          <v-card-subtitle>{{ getCapital(country) }}</v-card-subtitle>
          <v-card-text>
            <v-img
              :src="country.flags.png"
              aspect-ratio="16/9"
              class="mb-3"
              style="max-height: 200px;"
              align="left"
            ></v-img>
            <div>Población: {{ country.population }}</div>
            <div>Lenguaje(s): {{ formatLanguages(country.languages) }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-actions>
          <v-btn variant="tonal" color="primary" @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
        <v-card-title>{{ selectedCountry.name.common }}</v-card-title>
        <v-card-subtitle>{{ getCapital(selectedCountry) }}</v-card-subtitle>
        <v-card-text>
          <v-img
            :src="selectedCountry.flags.png"
            aspect-ratio="16/9"
            class="mb-3"
          ></v-img>
          <div><b>Población:</b> {{ selectedCountry.population }}</div>
          <div><b>Lenguaje(s):</b> {{ formatLanguages(selectedCountry.languages) }}</div>
          <div><b>Región:</b> {{ selectedCountry.region }}</div>
          <div><b>Subregión:</b> {{ selectedCountry.subregion }}</div>
          <div><b>Área:</b> {{ selectedCountry.area }} km²</div>
          <v-img
            :src="selectedCountry.coatOfArms.png"
            aspect-ratio="16/9"
            class="mt-3"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  // Definimos las propiedades que el componente recibe
  props: {
    countries: {
      type: Array,
      required: true
    },
    isGridView: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      selectedCountry: {},
    };
  },
  methods: {
    // Selecciona un país y abre el diálogo 
    selectCountry(country) {
      this.selectedCountry = country;
      this.dialog = true;
    },
    getCapital(country) {
      return country.capital ? country.capital[0] : 'Capital desconocida';
    },
    formatLanguages(languages) {
      return languages ? Object.values(languages).join(', ') : 'Lenguaje desconocido';
    },
  },
};
</script>

<!--Cambia el cursor a un puntero cuando se pasa sobre una tarjeta-->
<style scoped>
.v-card {
  cursor: pointer;
}
</style>
