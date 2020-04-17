describe("Loading Input Form", function () {
    before(function () {

        //Are we on the right page?
        cy.visit("http://localhost:3000")
        //makes sure lands on page with the Observation form
        cy.get("h3.title").should("contain", "Observation Form")
    })

    //there should be a log in button
    it("Greets with Log In",  ()=> {
        cy.contains("div.link", "Log In")
    })
    
  //the log in button should open the modal when clicked
    // it("Log in button takes user to settings modal", () => {
    //     cy.get()
    // })
  
})

