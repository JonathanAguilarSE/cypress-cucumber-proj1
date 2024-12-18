const locators = Object.freeze({
    // Main Page Locators
    headText: '.mb-2 h1',
    tableHeaders: '#product_table > thead > tr > th',
    tableRows: '#product_table > tbody > tr',
    addBtn: '#add_product_btn',
    totalText: '#total_amount',
    // Modal Locators
    modalHead: '#modal_title',
    modalX: '.delete',
    modalLabels: '#name_form label',
    allInputs: '.control input',
    qtyInput: '#quantity',
    prodInput: '#product',
    priceInput: '#price',
    submitBtn: '#submit'
})

class InventoryTablePage {
    locators = locators

    clickAdd() {
        cy.get(locators.addBtn).click()
    }

    clickSubmit() {
        cy.get(locators.submitBtn).click()
    }
}

module.exports = InventoryTablePage