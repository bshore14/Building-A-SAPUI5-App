sap.ui.controller("content.SalesOrders", {
    // controller logic goes here
    
    onInit: function() {
        // first, we have to define the odata model
        var dataModel = new sap.ui.model.odata.ODataModel(
                "models/GBI.xsodata"
            );
        // after that, we can bind the odata model the 
        // SalesOrders view, so controls within the view can use them
        
        this.getView().setModel(dataModel);
    },
    
    onExit: function() {
        // this function is called when the view is destroyed.
        // Used for clean-up activities
    },
    
    onAfterRendering: function() {
        // this function is called when the view has been redered.
        // Used for post-rendering manipulation of the HTML code
    },
    
    onBeforeRendering: function() {
        // this function is called before the view is re-rendered
        // (not before first rendering)
    },
    
    // this function updates the details panel
    updateDetails: function(oEvent) {
        // first, we need to get the context of the selected
        // row from the event
        var rowContext = oEvent.getParameter("rowContext");
        // next, we need the Input control that we want
        // to manipulate
        var customerNameInput = this.getView().byId("customerName");
        // now we can set the Input to the value of a 
        // field of the selected row
        customerNameInput.setValue(rowContext.getObject().CUSTOMER_NAME);
        
        var customerCityInput = this.getView().byId("city");
        customerCityInput.setValue(rowContext.getObject().CITY);
        
        var customerCountryInput = this.getView().byId("country");
        customerCountryInput.setValue(rowContext.getObject().SHORT_TEXT_COUNTRY);
        
        var customerSalesOrgInput = this.getView().byId("salesOrg");
        customerSalesOrgInput.setValue(
            rowContext.getObject().SHORT_TEXT_SALESORG
        );
    }
});
