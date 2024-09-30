import { create } from 'zustand';

const useStore = create((set) => ({
    // Estado inicial
    dolarBlue: null,
    loading: false,
    error: null,

    // Acción para actualizar el valor
    fetchDolarBlue: async () => {
        set({ loading: true, error: null });

        try {
            const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
            const data = await response.json();
            set({ dolarBlue: data.blue.value_sell, loading: false });
        } catch (error) {
            set({ error: 'Error fetching data', loading: false });
        }
    },
}));

export default useStore