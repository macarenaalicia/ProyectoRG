<template>
  <v-app :dark="darkMode">
    <v-app-bar app>
      <v-toolbar-title>Buscador de Paises</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch v-model="isDarkMode" label="Dark Mode"></v-switch>
    </v-app-bar>
    <v-main>
      <v-container>
        <SearchCountries />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'

// Crear una variable para el estado del "modo oscuro"
const isDarkMode = ref(false)
//  Obtener el tema actual de Vuetify
const theme = useTheme()

// Observa cambios en la variable isDarkMode, y actualiza el tema global de Vuetify cada vez que isDarkMode cambia
watch(isDarkMode, (newVal) => {
  theme.global.name.value = newVal ? 'dark' : 'light'
})

// Inicializar el estado de isDarkMode
isDarkMode.value = theme.global.current.value.dark
</script>
