export const addHtmlAndStyling = (htmlString) =>
  `<html>
    <head>
      <title></title>
      <style>
      .invoiceContainer {
        width: 620px;
        padding: 10px;
        margin: 10px;
        color: black;
        border: 1px #ddd solid;
      }
      .invoice .top-left {
        font-size: 65px;
        color: #3ba0ff;
      }
      
      .invoiceContainer .row {
        width: 600px;
        
      }

      .detailsRow {
      }
      
      .invoiceContainer .row .to {
        display: inline-block;
        width: 200px;
        vertical-align: top;
        
      
      }
      
      .invoiceContainer .row .from {
        display: inline-block;
        width: 200px;
        vertical-align: top;
      }

      
      
      
      .invoice .top-right {
        text-align: right;
        padding-right: 20px;
      }
      
      .invoice .payment-details {
        display: inline-block;
        width: 200px;
        vertical-align: top;
      }
    
      .invoice .payment-info {
        font-weight: 500;
        
      }
      
      .invoice .table-row .table > thead {
        border-top: 1px solid #ddd;
      }
      
      .invoice .table-row .table > thead > tr > th {
        text-align: left;
        padding: 8px 20px;
      
        border-bottom: solid #ddd 1px;
      }
      
      .invoice .table > tbody > tr > td {
        text-align: left;
        padding: 8px 20px;
      }

        .rightAlign {
        text-align: right !important;
      }
      
      .invoice .invoice-total {
        margin-top: 0;
        margin-right: -10px;
        font-size: 16px;
      }
      
      .invoice tbody {
        border-bottom: 1px solid #ddd;
      }
      
      

      table {
        border-collapse: collapse;
      }
        
      tr {
        border-bottom: solid #ddd 1px;
      } 
      .bottomText {
        width: 600px;
      } 

      .invoice-total  h3 {
        width: 600px;
        text-align: right;
      }

      .thanks  h4 {
        width: 600px;
        text-align: center;
      }
      
      
      
      </style>
    </head>
    <body>
    ${htmlString}
    </body>
  </html>`;
