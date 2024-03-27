sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/upload/UploadSetwithTable",
    "sap/m/upload/UploadSetwithTableItem",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/Text",
    "sap/ui/core/library",
    "sap/ui/core/Item",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Element"
], function (Controller, JSONModel, UploadSetwithTable, UploadSetwithTableItem, MessageBox, Fragment, MessageToast, Dialog, Button, mobileLibrary, Text, coreLibrary, CoreItem, Filter, FilterOperator, Element) {
    "use strict";

    return Controller.extend("com.sap.supplierregistration.controller.View1", {
        onInit: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel);
            this.oUploadSetTable = this.byId("UploadSetTable");
            this.documentTypes = this.getFileCategories();
            this.oItemsProcessor = [];



            let Dropdown = [
                {
                    "text": "Kazakhstan Resident"
                },
                {
                    "text": "Non-Resident"
                }];
            let uDropdown = [
                {
                    "text": "Manufacturer"
                },
                {
                    "text": "Goods/Materials Services"
                }];
            let cDropdown = [
                {
                    "text": "Owned"
                },
                {
                    "text": "Leased"
                }];
            let cloDropdown = [
                {
                    "text": "CT-KZ"
                },
                {
                    "text": "GOST"
                },
                {
                    "text": "ISO"
                },
                {
                    "text": "OHSAS"
                },
                {
                    "text": "ASME"
                },
                {
                    "text": "API"
                },
                {
                    "text": "ROK Accredit. Certif"
                },
                {
                    "text": "No"
                }
            ];
            let hsDropdown = [
                {
                    "text": "Yes"
                },
                {
                    "text": "No"
                },
                {
                    "text": "N/A"
                }];
            let vDropdown = [
                {
                    "text": "Medical Insurance"
                },
                {
                    "text": "HES Training"
                },
                {
                    "text": "Intensive Program"
                }];
            let sDropdown = [
                {
                    "filename": "State registration certificate of legal entity.xls",
                    "mediaType": "sap-icon://excel-attachment",

                    "type": "State registration certificate of legal entity"

                },
                {
                    "filename": "Certificate of VAT registration.pdf",
                    "mediaType": "sap-icon://pdf-attachment",

                    "type": "Certificate of VAT registration.png"
                },
                {
                    "filename": "Tax registration certificate.txt",
                    "mediaType": "sap-icon://doc-attachment",

                    "type": "Tax registration certificate"
                }];
            let aDropdown = [
                {
                    "assesmentid": "56234",
                    "assesmenttype": "EDD",

                    "completeby": "john",
                    "status": "Pending"

                },
                {
                    "assesmentid": "57212",
                    "assesmenttype": "Integrity check",

                    "completeby": "James",
                    "status": "Completed"

                }
            ];

            let amodel = new JSONModel(aDropdown);
            this.getView().setModel(amodel, "aModel");
            let gmodel = new JSONModel(sDropdown);
            this.getView().setModel(gmodel, "sModel");

            let smodel = new JSONModel(Dropdown);
            this.getView().setModel(smodel, "lModel");
            let umodel = new JSONModel(uDropdown);
            this.getView().setModel(umodel, "tModel");
            let cmodel = new JSONModel(cDropdown);
            this.getView().setModel(cmodel, "OLModel");
            let dmodel = new JSONModel(cloDropdown);
            this.getView().setModel(dmodel, "cloModel");
            let emodel = new JSONModel(hsDropdown);
            this.getView().setModel(emodel, "hsModel");
            let fmodel = new JSONModel(vDropdown);
            this.getView().setModel(fmodel, "vModel");

            var oModel = new JSONModel({
                selectedKey: "page1"
            });
            let model = new JSONModel({});
            let myModel = new JSONModel({
                "contracts": [
                    {
                        "ContractNo": "98712",
                        "ContractDescription": "Supplier agreement for raw materials",
                        "Status": "Pending",
                        "DeliveryDate": "07-Feb-2024"
                    },
                    {
                        "ContractNo": "91235",
                        "ContractDescription": "Service contract for IT support",
                        "Status": "Approved",
                        "DeliveryDate": "09-Feb-2024"
                    }
                ]
            });

            this.getView().setModel(oModel, "aaa");
            this.getView().setModel(model);
            this.getView().setModel(myModel, "myModel");
        },
        // onUploadCompleted: function (oEvent) {
        //     // Assuming UploadSetTable is the ID of your UploadSetwithTable
        //     var oUploadSetTable = this.getView().byId("UploadSetTable");

        //     // Perform actions after upload completion, for example, open the fragment
        //     this.openFileUploadFragment();

        //     // You might also need to refresh or update the data in your UploadSetwithTable
        //     oUploadSetTable.getBinding("items").refresh();
        // },
        onUploadCompleted: function (oEvent) {
            var oModel = this.getView().getModel();
            var iResponseStatus = oEvent.getParameter("status");

            // check for upload is sucess
            if (iResponseStatus === 201) {
                oModel.refresh(true);
                setTimeout(function () {
                    MessageToast.show("Document Added");
                }, 1000);
            }

        },
        // openFileUploadFragment: function () {

        //     var oView = this.getView();
        //     var oFragment = sap.ui.xmlfragment(oView.getId(), "com.sap.supplierportal.view.fragment.FileUpload", this);

        //     var oModel = oView.getModel("myModel");

        //     // Initialize data if not already present
        //     if (!oModel.getProperty("/selectedItems")) {
        //         oModel.setProperty("/selectedItems", []); // Adjust this based on your actual data structure
        //     }

        //     if (!oModel.getProperty("/types")) {
        //         oModel.setProperty("/types", []); // Adjust this based on your actual data structure
        //     }

        //     // Set the model for the fragment
        //     oFragment.setModel(oModel);

        //     oView.addDependent(oFragment);
        //     oFragment.open();
        // },
        uploadFilesHandler: function () {
            var oUploadSetTableInstance = this.byId("UploadSetTable");

            oUploadSetTableInstance.fileSelectionHandler();
        },
        isAddButtonEnabled: function (aSelectedItems) {
            if (aSelectedItems && aSelectedItems.length) {
                if (aSelectedItems.some(function (item) {
                    return !item.fileCategorySelected;
                })) {
                    return false;
                }
                return true;
            } else {
                return false;
            }
        },
        onRowPress: function () {
            debugger

            this.getOwnerComponent().getRouter().navTo("RouteView2");
        },
        getFileCategories: function () {
            return [
                { categoryId: "State registration certificate of legal entity", categoryText: "State registration certificate of legal entity" },
                { categoryId: "Certificate of VAT registration", categoryText: "Certificate of VAT registration" },
                { categoryId: "Statistic map", categoryText: "Statistic map" },
                { categoryId: "Tax registration certificate", categoryText: "Tax registration certificate" },
                { categoryId: "Reference on the official letterhead forms with the stamps and authorized signatures from Local Bank with tenge account details", categoryText: "Reference on the official letterhead forms with the stamps and authorized signatures from Local Bank with tenge account details" },
                { categoryId: "Reference on the official letterhead forms with the stamps and authorized signatures from company itself with all available account details (KZT, USD, EURO...)", categoryText: "Reference on the official letterhead forms with the stamps and authorized signatures from company itself with all available account details (KZT, USD, EURO...)" },
                { categoryId: "Organizational break-down structure", categoryText: "Organizational break-down structure" },
                { categoryId: "Feedbacks from major clients/customers ", categoryText: "Feedbacks from major clients/customers" },
                { categoryId: "List of works performed for over the last three years (as a free table with columns as 'customer', 'type of works/services', 'month/year')", categoryText: "List of works performed for over the last three years (as a free table with columns as 'customer', 'type of works/services', 'month/year')" }
            ];
        },
        onDocumentTypeChange: function (oEvent) {
            var isAddButtnEnabled = this.isAddButtonEnabled(oEvent.getSource().getModel().getData().selectedItems);
            this._fileUploadFragment.getBeginButton().setEnabled(isAddButtnEnabled);
        },
        handleConfirmation: function () {
            debugger
            var oData = this._fileUploadFragment.getModel().getData();
            var oSelectedItems = oData.selectedItems;

            if (oSelectedItems && oSelectedItems.length) {
                oSelectedItems.forEach(function (oItem) {
                    var oItemToUploadRef = oItem.itemInstance;
                    // setting the header field for custom document type selected
                    oItemToUploadRef.addHeaderField(new CoreItem({
                        key: "documentType",
                        text: oItem.fileCategorySelected
                    }));
                    oItem.fnResolve(oItemToUploadRef);
                });
            }
            this._fileUploadFragment.destroy();
            this._fileUploadFragment = null;
            this._oFilesTobeuploaded = [];
            this.oItemsProcessor = [];
        },
        openFileUploadDialog: function () {
            var items = this.oItemsProcessor;

            if (items && items.length) {

                this._oFilesTobeuploaded = items;

                var oItemsMap = this._oFilesTobeuploaded.map(function (oItemProcessor) {

                    return {
                        fileName: oItemProcessor.item.getFileName(),
                        fileCategorySelected: this.documentTypes[0].categoryId,
                        itemInstance: oItemProcessor.item,
                        fnResolve: oItemProcessor.resolve,
                        fnReject: oItemProcessor.reject
                    };
                }.bind(this));
                var oModel = new JSONModel({
                    "selectedItems": oItemsMap,
                    "types": this.documentTypes

                });
                if (!this._fileUploadFragment) {
                    Fragment.load({
                        name: "com.sap.supplierregistration.view.fragment.FileUpload",
                        id: this.getView().getId() + "-file-upload-dialog",
                        controller: this
                    })
                        .then(function (oPopover) {
                            this._fileUploadFragment = oPopover;
                            this.getView().addDependent(oPopover);
                            oPopover.setModel(oModel);
                            oPopover.open();
                        }.bind(this));
                } else {
                    this._fileUploadFragment.setModel(oModel);
                    this._fileUploadFragment.open();
                }
            }
        },
        closeFileUplaodFragment: function () {
            this._fileUploadFragment.close();
        },
        itemValidationCallback: function (oItemInfo) {
            const { oItem, iTotalItemsForUpload } = oItemInfo;
            var oUploadSetTableInstance = this.byId("UploadSetTable");
            var oSelectedItems = oUploadSetTableInstance.getSelectedItems();
            var oSelectedItemForUpdate = oSelectedItems.length === 1 ? oSelectedItems[0] : null;
            if (oSelectedItemForUpdate && oSelectedItemForUpdate.getFileName() === "-" && iTotalItemsForUpload === 1) {
                return new Promise((resolve) => {
                    if (oSelectedItemForUpdate) {
                        var oContext = oSelectedItemForUpdate.getBindingContext();
                        var data = oContext && oContext.getObject ? oContext.getObject() : {};

                        /* Demonstration use case of Setting the header field if required to be passed in API request headers to
                                inform backend with document type captured through user input */
                        oItem.addHeaderField(new CoreItem(
                            {
                                key: "existingDocumentID",
                                text: data ? data.id : ""
                            }
                        ));
                    }
                    resolve(oItem);
                });
            } else {
                var oItemPromise = new Promise((resolve, reject) => {
                    this.oItemsProcessor.push({
                        item: oItem,
                        resolve: resolve,
                        reject: reject
                    });
                });
                if (iTotalItemsForUpload === 1) {
                    this.openFileUploadDialog();
                } else if (iTotalItemsForUpload === this.oItemsProcessor.length) {
                    this.openFileUploadDialog();
                }
                return oItemPromise;
            }
        },

        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
        },
        onpress: function () {
            this.getView().getModel().setProperty("/selectedKey", "page2");
            this.byId("pageContainer").to(this.getView().createId("page2"));
        },

    });
});
