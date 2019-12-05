sap.ui.controller("content.Overview", {
    // controller logic goes here
    
    onInit: function() {
        // first, we have to define the odata model
        var dataModel = new sap.ui.model.odata.ODataModel(
                "models/GBI.xsodata"
        );
        // now we can bind the odata model to the SalesOrders
        // view, so controls within the view can use it
        this.getView().setModel(dataModel);
        // before the view is rendered, we want to attach the vizframe
        // popover to the chart. First, we need to get chart and popover
        var oVizFrame = this.byId('barchart');
        var oVizPopover = this.byId('vizPopover');
        // after that, connecting is easy
        oVizPopover.connect(oVizFrame.getVizUid());
    },
    
    onExit: function() {
        // this function is called when the view is destroyed.
        // Used for clean-up activities
    },
    
    onAfterRendering: function() {
        // after the view has been rendered, we want the date ranges slider
        // to fire a change event so the filters and the sorter are applied
        // in order to fire a change, we need to get the date range slider
        var drs = this.byId('drs');
        
        // becuase we catch undefined values in our handleChange function,
        // we do not care if anything is set in the date range slider
        drs.fireChange();
    },
    
    onBeforeRendering: function() {
        // this function is called before the view is re-rendered
        // (not before first rendering)
    },
    
    // this function updates the bar chart
    handleChange: function(oEvent) {
        // first, we have to get the new values of the two dates
        // from our date range selector
        var fromDate = oEvent.getSource().getDateValue();
        var toDate = oEvent.getSource().getSecondDateValue();
        
        // if there is no fromDate set, we'll set
        // it to the 01/01/1970
        if (!fromDate) {
                fromDate = new Date(1970,1,1);
        }
        // if there is no toDate set, we'll set
        // it to the current date
        if (!toDate) {
                toDate = new Date();
        }
        
        // next, we want to update the filters on our flattened data set
        // to manipulate it. first, we have to get it
        var fd = this.getView().byId("flattenedData");
        
        // now, we build a new filter based on the values retrieved
        // from our event. Becuase the retrieved values are dates,
        // we have to extract the months and years.
        // The first argument defines the column on which we want
        // to filter, the second argument the filter operation
        // (BT stands for "in between") and the last two 
        // arguments the actual filter values
        var monthFilter = new sap.ui.model.Filter(
            "MONTH",
            sap.ui.model.FilterOperator.BT,
            fromDate.getMonth(),
            toDate.getMonth()
        );
        
        var yearFilter = new sap.ui.model.Filter(
            "YEAR",
            sap.ui.model.FilterOperator.BT,
            fromDate.getFullYear(),
            toDate.getFullYear()
        );
        
        // in addition, we want to sort our data by net revenue
        // the second (boolean) value defines if the data is sorted
        // in descending order
        var sorter = new sap.ui.model.Sorter(
            "NET_REVENUE",
            true
        );
        
        // then, we need to re-bind the data to the flattened
        // dataset with the new filters and the sorter
        fd.bindData(
            "/SalesOrders",
            null,
            [sorter],
            [
                monthFilter,
                yearFilter
            ]
        );
        
        // last, we need to update the chart
        // first, we need to get it
        var vizFrame = this.getView().byId("barchart");
        // then, we update the chart, but only the data
        vizFrame.vizUpdate({
            'data' : fd
        });
    }
});
