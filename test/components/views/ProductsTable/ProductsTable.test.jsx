import { render } from "@testing-library/react"
import ProductsTable from "../../../../src/components/views/ProductsTable/ProductsTable"

describe('TEST - COMPONENT <ProductsTable />', () => {
    test('CONTROL - Validar la estructura del componente', () => {
        render(<ProductsTable/>);
    })
})