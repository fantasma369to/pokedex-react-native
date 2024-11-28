import { create } from "zustand";

export const usePokemonStore = create((set) => ({
  selectedPokemon: null,
  pokemonDetails: {
    type: "",
    emoji: "",
    backgroundcolor: "",
    imagen: "",
  },
  setSelectedPokemon: (p) => set({ selectedPokemon: p }),
  setPokemonDetails: (p) => set({ pokemonDetails: p }),
}));
