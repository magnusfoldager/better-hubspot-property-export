# better-hubspot-property-export

HubSpot is notoriously bad property exports, and will not let you export data such as creation date, last updated date, who updated the property, and calculation formula. This tool aims to let you export all fields available through the API.

Data configured in the form to the right is used only to make a request to the HubSpot API through a Proxy, and is not saved anywhere. If you want to be extra careful, create a new private app with the following scopes depending on your needs:

- media_bridge.read
- crm.schemas.custom.read
- timeline
- tickets
- e-commerce
- crm.objects.goals.read
- crm.objects.contacts.read
- crm.objects.deals.read
- crm.schemas.quotes.read
- crm.objects.companies.read
- crm.objects.deals.write
- crm.schemas.deals.read
- crm.objects.companies.write
- crm.schemas.contacts.read
- crm.objects.contacts.write
- crm.schemas.companies.read
- crm.schemas.line_items.read