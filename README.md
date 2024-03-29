# better-hubspot-property-export

View live: https://magnusfoldager.github.io/better-hubspot-property-export/

HubSpot is notoriously bad property exports, and will not let you export data such as creation date, last updated date, who updated the property, and calculation formula. This tool aims to let you export all fields available through the API.

Data configured in the form to the right is used only to make a request to the HubSpot API through a Proxy, and is not saved anywhere. If you want to be extra careful, create a new private app with the following scopes depending on your needs:

- crm.schemas.contacts.read
- crm.schemas.companies.read
- crm.schemas.deals.read
- crm.schemas.quotes.read
- crm.schemas.line_items.read
- crm.schemas.custom.read
- tickets