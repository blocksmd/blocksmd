# On this page

- [Set data to use on templates](#set-data-to-use-on-templates)
- [Read data from remote sources (such as Google Sheets)](#read-data-from-remote-sources-such-as-google-sheets)
  - [`get-objects-name`](#get-objects-name)
  - [JSON data and `get-format`](#json-data-and-get-format)

# Set data to use on templates

Set local data that can be used in the template by putting valid JSON inside pairs of <code>```</code> or <code>~~~</code>, with the `data` keyword placed right after the opening pair.

````text
``` data
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Hello, my name {{ name }} and my email address is {{ email }}.
````

![Set local data](https://res.cloudinary.com/dnriuttuy/image/upload/v1722064021/set-read-data-1_bzoxzd.png)

You can have multiple of these data-blocks anywhere on the document, and they will be combined together. In case of key collisions, the blocks that come after will override the ones that come before.

````text
``` data
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Hello, my name **{{ name }}** and my email address is {{ email }}.

~~~ data
{
  "name": "John"
}
~~~
````

![Set multiple local data-blocks](https://res.cloudinary.com/dnriuttuy/image/upload/v1722064199/set-read-data-2_dezdke.png)

# Read data from remote sources (such as Google Sheets)

> Learn how to set up Google Sheets to read data: [Google Sheets integration](https://github.com/blocksmd/blocksmd/blob/main/docs/google-sheets-integration.md)

You can also read data from a URL using `#! get-url = {url}`. By default, CSV is the expected format, and the incoming data is formatted so that each key is a spreadsheet cell reference. This is because by default, Google Sheets is the expected source.

For example, here's the spreadsheet we want to read: https://docs.google.com/spreadsheets/d/1NTH5NCCwxeYO2VHZBOHv_Eem3yaI2iepoZnltwFtxFw/

![Google Sheets source](https://res.cloudinary.com/dnriuttuy/image/upload/v1722065244/read-data-1_qdi1fb.png)

````text
#! get-url = https://docs.google.com/spreadsheets/d/e/2PACX-1vTKJSALN8U91YSqvQZ6bQf24z0okzMM2J9D2VtptW2eASFbIC9dKyj2SlSpeaozczNR-u15mfpHqjuV/pub?gid=0&single=true&output=csv
#! page = single

``` data
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

# {{ name }}

I'm a {{ A3 }} with {{ C3 }}+ years of experience, with a
strong focus on building scalable microservices that can
serve millions of users. I'm proficient in the following
languages:

- [.list-unstyled]
- [x] Python
- [x] JavaScript/TypeScript
- [x] Go

---
{% if D3 -%}
  I'm currently available for work: {{ email }}.
{% else -%}
  I'm currently not available for work.
{% endif %}
````

![Read data from GSheets](https://res.cloudinary.com/dnriuttuy/image/upload/v1722065593/read-data-2_ylvp7v.png)

Apart from directly referencing each cell on your template, you can also go through the rows with a for-loop, especially if your spreadsheet is formatted like an SQL table (first row are the field names). Here's another spreadsheet we want to read: https://docs.google.com/spreadsheets/d/16cBMrmTigda5VtAw1fi4gXCwMpBZqcSVs-xeAey_axE

![Google Sheets source](https://res.cloudinary.com/dnriuttuy/image/upload/v1722066432/read-data-3_k1ad7q.png)

```text
#! get-url = https://docs.google.com/spreadsheets/d/e/2PACX-1vQBDvj-Sg6Ax2RA4bg74y-rUpm2jrCmulesVvr9JrXYFV7WvAK-V2I38P1NIApCf_UYZm3JZ-Tt8rfj/pub?gid=0&single=true&output=tsv
#! get-format = tsv
#! page = single

{% for person in objects %}
- **Name**: {{ person["Name"] }}
- **Twice the favorite number**: {{ person["Twice the favorite number"] }}
---
{% endfor %}
```

![Read table data from GSheets](https://res.cloudinary.com/dnriuttuy/image/upload/v1722066747/read-data-4_kkneop.png)

Here, we are reading TSV data by setting the `#! get-format = tsv`. Also note, because **blocks.md** uses [Nunjucks](https://mozilla.github.io/nunjucks/), we are able to loop through the `objects` that we read from the spreadsheet and output the data on the template.

## `get-objects-name`

As you can see above, the rows read from the remote source are available as `objects` in the template. However, you can change this reference name to anything you want using the `#! get-objects-name = {name}` setting. For example:

```text
#! get-objects-name = persons
#! get-url = https://docs.google.com/spreadsheets/d/e/2PACX-1vQBDvj-Sg6Ax2RA4bg74y-rUpm2jrCmulesVvr9JrXYFV7WvAK-V2I38P1NIApCf_UYZm3JZ-Tt8rfj/pub?gid=0&single=true&output=csv
#! page = single

{% for person in persons %}
- **Name**: {{ person["Name"] }}
- **Twice the favorite number**: {{ person["Twice the favorite number"] }}
---
{% endfor %}
```

## JSON data and `get-format`

So far, we've been only talking about reading CSV or TSV data from Google Sheets. However, JSON data from a traditional web API is also fully supported. You can read JSON data by setting `#! get-format = JSON`, placing your URL in the `#! get-url = {url}`, and (optionally) changing the objects reference using `#! get-objects-name = {name}`.

Let's say we want to read https://jsonplaceholder.typicode.com/users, which returns random JSON data in the following format:

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  ...
]
```

```text
#! get-format = json
#! get-objects-name = users
#! get-url = https://jsonplaceholder.typicode.com/users
#! page = single

{% for user in users %}
- **Name**: {{ user.name }}
- **Email**: {{ user.email }}
---
{% endfor %}
```

![Read JSON data](https://res.cloudinary.com/dnriuttuy/image/upload/v1722067199/read-data-5_mfmqzo.png)
