describe("Loading Input Form", function () {
    before(function () {
        cy.visit("http://localhost:3000")
    })
    it("Loads Title", function () {
        cy.get("h3.title").should("contain", "Observation Form")
    })
  
})