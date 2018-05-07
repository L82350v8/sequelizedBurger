// DOM must be fully loaded before we attach event listeners.
$(function () {

  // Order Burger Submit button 
  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    // capture inputs from the order burger submit form.
    var custName = $("#customer-name-input").val().trim();

    var newBurgerCust = {
      burgerName: $("#burger-name-input").val().trim(),
      devoured: 0,
      custName: $("#customer-name-input").val().trim(),
    };

    // check seq_customers table to see if entered customer name already exists.
    $.ajax("/api/customers/" + custName, {
      type: "GET",
      custName: custName
    }).then(function (getCustResult) {
      // if entered customer does not exist, insert entered burger and entered new customer. 
      if (getCustResult.length === 0) {
        // insert new burger
        $.ajax("/api/burgers/cust", {
          type: "POST",
          data: newBurgerCust
        }).then(function () {
          // Reload the page to get the updated lists
          location.reload();
        });
      }
      // entered customer exists - so use seq_customers.id to populate seq_customer_id field on seq_burgers row. 
      else {
        var newBurger = {
          burgerName: $("#burger-name-input").val().trim(),
          devoured: 0,
          seqCustomerId: getCustResult[0].id
        };
        // create new burger row using existing seq_customer.id value from existing customer.
        $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
        }).then(function () {
          // Reload the page to get the updated lists
          location.reload();
        });
      }
    });
  });

  // Devour It button listener. 
  $(document).on('click', "#devour-btn", function () {
    event.preventDefault();
    var id = $(this).data("burger-id");
    // when user clicks devour button, app will always set the devoured boolean to 1 (true).
    var devouredState = {
      devoured: 1
    };
    // update the devoured field's value to 1 for the clicked burger id. 
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Delete Burger button listener.
  $(document).on('click', "#delete-burger-btn", function () {
    event.preventDefault();
    var id = $(this).data("burger-id");
    // delete the burger row for the clicked burger id. 
    $.ajax("/api/burgers/" + id, {
      type: "POST"
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  }); 
  
  // Delete (customer) Name button listener.
  $(document).on('click', "#delete-name-btn", function () {
    event.preventDefault();
    var id = $(this).data("cust-id");
    // delete the burger row for the clicked burger id. 
    $.ajax("/api/customers/" + id, {
      type: "POST"
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});



