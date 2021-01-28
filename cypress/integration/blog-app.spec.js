describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    const user1 = {
      username: "tranlele",
      name: "TL",
      password: "tranlele",
    };
    cy.request("POST", "http://localhost:3000/api/users/", user1);

    const user2 = {
      username: "newone",
      name: "TQ",
      password: "newone",
    };
    cy.request("POST", "http://localhost:3000/api/users/", user2);

    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("blogs");
  });

  it("user can login", function () {
    cy.contains("Login").click();
    cy.get("#username").type("tranlele");
    cy.get("#password").type("tranlele");
    cy.get("#login-button").click();

    cy.contains("TL logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("Login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error").should("contain", "Wrong username or password");
    cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    cy.get(".error").should("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "tranlele", password: "tranlele" });
    });

    it("a new blog can be created", function () {
      cy.contains("Create blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("TL");
      cy.get("#url").type("abc.com");
      cy.get("#create-button").click();
      cy.contains("a blog created by cypress TL");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.contains("Create blog").click();

        cy.createBlog({
          title: "another blog",
          author: "tranle",
          url: "wefds.com",
          likes: 1,
        });
      });

      it("click on Like button", function () {
        cy.get("#view-or-hide").click();
        cy.contains("wefds.com");
        cy.get("#like-button").click();
        cy.get("#like-numbers").should("contain", "2");
        cy.contains("another blog");
      });

      it.only("is only deleted by user creates it, otherwise cannot find any delete button", function () {
        cy.get("#logout-button").click();
        cy.login({ username: "newone", password: "newone" });
        cy.contains("Create blog").click();

        cy.createBlog({
          title: "second blog",
          author: "tranle",
          url: "hello.com",
          likes: 0,
        });

        cy.get("#all-blogs")
          .children()
          .then((item) => {
            item.map((_, el) => {
              cy.wrap(el).within(() => {
                cy.get("#title")
                  .invoke("text")
                  .then((text) => {
                    if (text.includes("second blog")) {
                      cy.get("#view-or-hide").click();
                      cy.get(".blogDetails").should("contain", "Delete Blog");
                      cy.contains("Delete Blog").click();
                      cy.get("#title").should("not.contain", "another blog");
                      return;
                    }

                    cy.get("#view-or-hide").click();
                    cy.get(".blogDetails").should("not.contain", "Delete Blog");
                  });
              });
            });
          });
      });
    });
    it("sort blogs by like quantity", function () {
      cy.contains("Create blog").click();

      cy.createBlog({
        title: "another blog",
        author: "tranle",
        url: "wefds.com",
        likes: 1,
      });

      cy.createBlog({
        title: "this is 32",
        author: "tranle",
        url: "wefds.com",
        likes: 4,
      });

      cy.createBlog({
        title: "third blog",
        author: "tranle",
        url: "wefds.com",
        likes: 2,
      });

      let currentLike;
      cy.get("#all-blogs")
        .children()
        .then((item) => {
          item.map((index, el) => {
            cy.wrap(el).within(() => {
              cy.get("#view-or-hide").click();
              cy.get("#likes")
                .invoke("text")
                .then(parseFloat)
                .then((likeAmount) => {
                  if (index === 0) {
                    currentLike = likeAmount;
                    return;
                  }

                  expect(likeAmount <= currentLike).to.be.true;
                  currentLike = likeAmount;
                });
            });
          });
        });
    });
  });
});
