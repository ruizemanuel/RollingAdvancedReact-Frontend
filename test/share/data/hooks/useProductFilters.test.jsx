import { act, renderHook } from "@testing-library/react";
import useProductFilters from "../../../../src/share/data/hooks/useProductFilters";
import { products } from "../../../fixtures/constants";

describe('TEST - HOOK useProductsFilters', () => {

    test('debe inicializar el estado correctamente', () => {
        const { result } = renderHook(() => useProductFilters(products));

        expect(result.current.filteredProducts).toEqual(products);
        expect(result.current.filter).toBe(false);
    });

    test('debe filtrar por categoría', () => {
        const { result } = renderHook(() => useProductFilters(products));


        act(() => {
            result.current.filterByCategory('pizza');
        });
        console.log('filteredProducts después del filtro:', result.current.filteredProducts);

        expect(result.current.filteredProducts).toEqual([products[0]]);
        expect(result.current.filter).toBe(true);
    });

    test('debe filtrar por precio', () => {
        const { result } = renderHook(() => useProductFilters(products));
    
        
        act(() => {
            result.current.filterByPrice(60, 100);
        });
    
        expect(result.current.filteredProducts).toEqual([products[3]]);
        expect(result.current.filter).toBe(true);
      });

      test('debe filtrar por stock', () => {
        const { result } = renderHook(() => useProductFilters(products));
    
        
        act(() => {
            result.current.filterByStock('sin-stock');
        });
    
        expect(result.current.filteredProducts).toEqual([products[2]]);
        expect(result.current.filter).toBe(true);
      });

      test('debe restaurar los filtros', () => {
        const { result } = renderHook(() => useProductFilters(products));
    
        act(() => {
            result.current.filterByCategory('pizza');
            result.current.filterByPrice(5, 9);
            result.current.filterByStock('en-stock');
            result.current.restoreFilters();
        });

        expect(result.current.filteredProducts).toEqual(products);
        expect(result.current.filter).toBe(false);
      });


});
