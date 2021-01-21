export const addHtmlAndStylingToOrder = (htmlString) =>
	`<html>
        <head>
            <title></title>
            <style>
           


tr {
	border-bottom: 1px solid #eee;
}


.invoice-box {
  margin: 20px;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(1) {
  width: 8px;
}

.invoice-box table tr td:nth-child(3) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.total td:nth-child(3) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}

            </style>
        </head>
        <body>
            ${htmlString}
        </body>
    </html>`;

export const addHtmlAndStylingToInvoice = (htmlString) =>
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
