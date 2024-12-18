import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import InventoryTablePage from "../../pages/InventoryTablePage";

const iTPage = new InventoryTablePage();

Given('the user is on {string}', (url) => {
    cy.visit(url)
})

Then('the user should see the {string} heading', (heading) => {
    cy.get(iTPage.locators.headText).should('have.text', heading)
})

Then('the user should see the table with the headers below', (dataTable) => {
    const expectedHeaders = dataTable.raw()[0]
    // cy.log(expectedHeaders)

    cy.get(iTPage.locators.tableHeaders).then(($headerElements) => {
        const actualHeaders = Array.from($headerElements, (el) => el.innerText.trim())
        // cy.log(actualHeaders)
        expect(actualHeaders).to.deep.equal(expectedHeaders)
    })
})

Then('the user should see the table with the rows below', (dataTable) => {
    const expectedRows = dataTable.rawTable
    // cy.log(expectedRows)

    cy.get(iTPage.locators.tableRows).each(($row, rowIndex) => {
        cy.wrap($row).then(($rowElement) => {
            const actualRow = Array.from($rowElement.find('td'), (cell) => cell.innerText.trim())
            // cy.log(actualRow)
            expect(actualRow).to.deep.equal(expectedRows[rowIndex])
        })
    })

});

Then('the user should see the "ADD PRODUCT" button is enabled', () => {
    cy.get(iTPage.locators.addBtn).should('be.enabled')
})

Then(/^the user should see the "Total = \$([\d,]+)" text is displayed$/, (amount) => {
    const expectedTextAmt = `Total = $${amount}`
    cy.get(iTPage.locators.totalText).should('contain.text', expectedTextAmt).and('be.visible')
})



When('the user clicks on the "ADD PRODUCT" button', () => {
    iTPage.clickAdd()
});

Then('the user should see the {string} modal with its heading', (headingText)=> {
    cy.get(iTPage.locators.modalHead).should('have.text', headingText).and('be.visible')
})

Then('the user should see the "X" button is enabled', () => {
    cy.get(iTPage.locators.modalX).should('be.enabled')
})

Then('the user should see the "Please select the quantity" label', () => {
    cy.get(iTPage.locators.modalLabels).first().should('be.visible')
})

Then(/the user should see the "([^"]*)" input box is enabled$/, (inputName) => {
    const lowerCasedInput = inputName.toLocaleLowerCase()
    // cy.log(lowerCasedInput)
    cy.get(iTPage.locators.allInputs).filter(`#${lowerCasedInput}`).and('be.enabled')
})

Then(/^the user should see the "Please enter the ([^"]*) of the product" label$/, (labelType) => {
    cy.get(iTPage.locators.modalLabels).should('contain.text', `${labelType}`).and('be.visible')
})

Then('the user should see the "SUBMIT" button is enabled', () => {
    cy.get(iTPage.locators.submitBtn).should('be.enabled')
})



When('the user clicks on the "X" button', () => {
    cy.get(iTPage.locators.modalX).click()
})

Then('the user should not see the "Add New Product" modal', () => {
    cy.get(iTPage.locators.modalHead).should('not.exist')
})



Then(/^the user enters the quantity as "(\d+)"$/, (numInput) => {
    cy.get(iTPage.locators.qtyInput).type(numInput)
});

Then(/^the user enters the product as "([^"]*)"$/, (productInput) => {
    cy.get(iTPage.locators.prodInput).type(productInput)
});

Then(/^the user enters the price as "(\d+)"$/, (numInput) => {
    cy.get(iTPage.locators.priceInput).type(numInput)
});

Then('the user clicks on the "SUBMIT" button', () => {
    iTPage.clickSubmit()
})

Then('the user should see the table with the new row below', (dataTable) => {
    const expectedResult = dataTable.raw()[0]
    // cy.log(expectedResult)
    cy.get(iTPage.locators.tableRows).last().find('td').then(($rowTexts) => {
        const actualRowText = Array.from($rowTexts, (rowText) => rowText.innerText.trim())
        // cy.log(actualRowText)
        expect(actualRowText).to.deep.equal(expectedResult)
    })
})


// MUST REFACTOR AND MAKE A FUNCTION TO CALL ON SPECIFIC INPUT AND TYPE INPUT IN