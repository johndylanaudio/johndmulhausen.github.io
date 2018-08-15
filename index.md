---
title: Welcome to the documentation test page!
description: The test page for the Oculus Documentation.
keywords: test, example, prototype, demo
---
This is a demo of components, tags, styles, tools, and strategies we use for the
docs.

# Heading 1

Most pages don't actually have a H1 heading. The page title from the metadata is
automatically inserted.

## Heading 2

When writing docs, always use this as your maximum heading

### Heading 3

Heading 3 text here, implies a sub-section of the topic being covered in heading 2

#### Heading 4

Heading 4 text here, ditto

##### Heading 5

Heading 5 text here, ditto

###### Heading 6

This is probably too many headings. Try to avoid it.

## Typography

Plain block of text.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.

**Inline text styles**:

- **bold**
- _italic_
- ***bold italic***
- ~~strikethrough~~
- <u>underline</u>
- _<u>underline italic</u>_
- **<u>underline bold</u>**
- ***<u>underline bold italic</u>***
- `monospace text`

## Links and images

### Buttons

[Button Example](https://www.google.com){: class="button" }

### Links

- [a markdown link](https://developer.oculus.com/)

- [a markdown link that opens in a new window](https://oculus.com/){: target="_blank" class="_" }
  (the `class="_"` trick prevents Atom from italicizing the whole rest of the file until it encounters another underscore.)

- [a markdown link to a custom target ID](#custom-target-id)

- <a href="https://oculus.com/">an HTML link</a>

- <a href="https://oculus.com/" target="_blank" class="_">an HTML link that opens in a new window</a>

  - You can specify `org=foo` to use a Github organization other than Oculus

- A link to an auto-generated reference page that we pull in during docs builds:
[/engine/reference/builder/#env](/engine/reference/builder/#env).

  - If you can't find a reference page in the `oculus.github.io`
  GitHub repository, but see it out on `docs.oculus.com`, you can
  surmise that it's probably auto-generated from the codebase.
  (FYI, to view the markdown source for the file, just click
  **Edit this page** on `docs.oculus.com`. But don't use that URL in your docs.)

  - Go to the file in a web browser, grab everything after the domain name
  from the URL, and use that as the link in your docs file.

  - Keep in mind that this link doesn't resolve until you merge the PR and
  your docs are published on [docs.oculus.com](/).

{: id="custom-target-id"}

#### Using a custom target ID
This topic has a custom target ID above its heading that can be used to link to
it, in addtion to, or instead of, the default concatenated heading style. The
format of this ID is `{: id="custom-target-id"}`.

You can use custom targets to link to headings or even paragraphs. You link to
it as you would any other link, using `#custom-target-id` as the ultimate
target.

An example of a custom target ID in the documentation is the topic on
[Compose file version 2 topic on CPU and other resources](/compose/compose-file/compose-file-v2.md#cpu-and-other-resources).
It has a long heading that breaks the normal markdown linking mechanism,
so we added a custom ID above the target heading.

#### Images

![a small cute image](/images/oculusgo.jpg)

#### Lists

- Bullet list item 1
- Bullet list item 2
* Bullet list item 3

1.  Numbered list item 1. Two spaces between the period and the first letter
    helps with alignment.

2.  Numbered list item 2. Let's put a note in it.

    >**Note**: We did it!

3.  Numbered list item 3 with a code block in it. You need the blank line before
    the code block happens.

    ```bash
    $ oculus run hello-world
    ```

4.  Numbered list item 4 with a bullet list inside it and a numbered list
    inside that.

    - Sub-item 1
    - Sub-item 2
      1.  Sub-sub-item 1
      2.  Sub-sub-item-2 with a table inside it because we like to party!
          Indentation is super important.

          |Header 1 | Header 2 |
          |---------|----------|
          | Thing 1 | Thing 2  |
          | Thing 3 | Thing 4  |


## Tables

Some tables in markdown and html.

| Permission level                                                         | Access                                                       |
|:-------------------------------------------------------------------------|:-------------------------------------------------------------|
| **Bold** or _italic_ within a table cell. Next cell is empty on purpose. |                                                              |
|                                                                          | Previous cell is empty. A `--flag` in mono text.             |
| Read                                                                     | Pull                                                         |
| Read/Write                                                               | Pull, push                                                   |
| Admin                                                                    | All of the above, plus update description, create and delete |

The alignment of the cells in the source doesn't really matter. The ending pipe
character is optional (unless the last cell is supposed to be empty). The header
row and separator row are optional.

If you need block-level HTML within your table cells, such as multiple
paragraphs, lists, sub-tables, etc, then you need to make a HTML table.
This is also the case if you need to use rowspans or colspans. Try to avoid
setting styles directly on your tables! If you set the width on a `<td>`, you
only need to do it on the first one. If you have a `<th>`, set it there.

> **Note**: If you need to have **markdown** in a **HTML** table, add
> `markdown="span"` to the HTML for the `<td>` cells that contain the Markdown.

<table>
  <tr>
    <th width="50%">Left channel</th>
    <th>Right channel</th>
  </tr>
  <tr>
  <td>This is some test text. <br><br>This is more <b>text</b> on a new line. <br><br>Lorem ipsum dolor <tt>sit amet</tt>, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </td>
    <td>This is some more text about the right hand side. There is a <a href="https://github.com/oculus/oculus-ce/blob/master/components/cli/experimental/README.md" target="_blank" class="_">link here to the Oculus Experimental Features README</a> on GitHub. In tables, links need to be `<a href="..."></a>`. <br><br>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
  </tr>
  <tr>
  <td>
  <p><a class="button outline-btn" href="/">Go to the docs!</a></p>
  <p><a href="/"><font color="#BDBDBD" size="-1">It is dark here. You are likely to be eaten by a grue.</font></a></p>
  </td>
  <td>
  <p><a class="button outline-btn" href="/">Go to the docs!</a></p>
  <p><a href="/"><font color="#BDBDBD" size="-1">It is dark here. You are likely to be eaten by a grue.</font></a></p>
  </td>
  </tr>
</table>


## Site-wide variables

Look in the top-level `_config.yml` for site-wide variables.

## Mixing Markdown and HTML

You can use <b>span-level</b> HTML tags within Markdown.

You can use a `<br />` tag to impose an extra newline like here:<br />

You can use entities like `&nbsp;` to keep a&nbsp;bunch&nbsp;of&nbsp;words&nbsp;together&nbsp;.

<center>
You can use block-level HTML tags too. This paragraph is centered.
</center>

Keep reading for more examples, such as creating tabbed content within the
page or displaying content as "cards".

## Jekyll / Liquid tricks

### Assignment

This paragraph is centered and colored green by setting CSS directly on the element.
**Even though you can do this and it's sometimes the right way to go, remember that if
we re-skin the site, any inline styles need to be dealt with manually!**
{: style="text-align:center; color: green" }

{% assign my-text="foo" %}

The Liquid assignment just before this line fills in the following token {{ my-text }}.
This is effective for the rest of this file unless the token is reset.

{% capture my-other-text %}foo{% endcapture %}
Here is another way: {{ my-other-text }}

You can nest captures within each other to represent more complex logic with Liquid.

### Liquid variable scope

- Things set in the top level of `_config.yml` are available as site variables, like `{{ site.debug }}`.
- Things set in the page's metadata, either via the defaults in `_config.yml` or per page, are available as page variables, like `{{ page.title }}`.
- In-line variables set via `assign` or `capture` are available for the remainder of the page after they are set.
- If you include a file, you can pass key-value pairs at the same time. These are available as include variables, like `{{ include.toc_min }}`.

## Bootstrap and CSS tricks

Here are cool components you can include on Docs pages using
[Bootstrap](http://getbootstrap.com/) and [CSS](https://www.w3schools.com/css/).

### Tabs

Here are some tabs. They are just Bootstrap 4 tabs, so look up their docs.

<!-- Nav tabs -->
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#menu1">Menu 1</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#menu2">Menu 2</a>
  </li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div class="tab-pane container active" id="home">home text</div>
  <div class="tab-pane container fade" id="menu1">menu1 text</div>
  <div class="tab-pane container fade" id="menu2">menu2 text</div>
</div>

### Columnar text

You can use the CSS `column-count` to flow your text into multiple columns.
You need a couple `<br />`s to clear the row before.

<div style="column-count: 3"><p>This example uses a HTML div. This example uses a HTML div. This example uses a HTML div.
This example uses a HTML div. This example uses a HTML div. This example uses a HTML div.
This example uses a HTML div. This example uses a HTML div. This example uses a HTML div.
This example uses a HTML div. This example uses a HTML div. This example uses a HTML div.
This example uses a HTML div. This example uses a HTML div. This example uses a HTML div.
This example uses a HTML div. This example uses a HTML div. This example uses a HTML div.
This example uses a HTML div. This example uses a HTML div. This example uses a HTML div.
This example uses a HTML div. This example uses a HTML div. This example uses a HTML div.
This example uses a HTML div. This example uses a HTML div. This example uses a HTML div.
</p>
</div>

This example does it with Markdown. You can't have any blank lines or it breaks the Markdown block up.
This example does it with Markdown. You can't have any blank lines or it breaks the Markdown block up.
This example does it with Markdown. You can't have any blank lines or it breaks the Markdown block up.
This example does it with Markdown. You can't have any blank lines or it breaks the Markdown block up.
This example does it with Markdown. You can't have any blank lines or it breaks the Markdown block up.
This example does it with Markdown. You can't have any blank lines or it breaks the Markdown block up.
This example does it with Markdown. You can't have any blank lines or it breaks the Markdown block up.
{: style="column-count: 3 "}

### Badges

You can have <span class="badge badge-info">badges</span>. You can also have
<span class="badge badge-warning">yellow badges</span> or
<span class="badge badge-danger">red badges</span>.

#### Badges as links

You can make a badge a link. Wrap the `<span>` with an `<a>` (not the other way
around) so that the text on the badge is still white.

```html
<a href="/test/" target="_blank" class="_"><span class="badge badge-info" data-toggle="tooltip" data-placement="right" title="Open the test page (in a new window)">Test</span></a>
```

<a href="/test/" target="_blank" class="_"><span class="badge badge-info" data-toggle="tooltip" data-placement="right" title="Open the test page (in a new window)">Test</span></a>


You can also put tooltips on badges (as the example above shows). Keep reading for tooltips.

### Tooltips

To add a tooltip to any element, set `data-toggle="tooltip"` and set a `title`.
Hovering over the element with the mouse pointer will make it visible. Tooltips
are not visible on mobile devices or touchscreens, so don't rely on them as the
only way to communicate important info.

```html
<span class="badge badge-info" data-toggle="tooltip" data-placement="right" title="Open the test page">Test</span>
```

<span class="badge badge-info" data-toggle="tooltip" data-placement="right" title="Open the test page">Test</span>

You can optionally set the `data-placement` attribute to `top`, `bottom`,
`middle`, `center`, `left`, or `right`. Only set it if not setting it causes
layout issues.

You don't have to use HTML. You can also set these attributes using Markdown.

```markdown
This is a paragraph that has a tooltip. We position it to the left so it doesn't align with the middle top of the paragraph (that looks weird).
{:data-toggle="tooltip" data-placement="left" title="Markdown tooltip example"}
```

This is a paragraph that has a tooltip. We position it to the left so it doesn't align with the middle top of the paragraph (that looks weird).
{:data-toggle="tooltip" data-placement="left" title="Markdown tooltip example"}

## Running in-page Javascript

If you need to run custom Javascript within a page, and it depends upon JQuery
or Bootstrap, make sure the `<script>` tags are at the very end of the page,
after all the content. Otherwise the script may try to run before JQuery and
Bootstrap JS are loaded.

> **Note**: In general, this is a bad idea.

## Admonitions (notes)

Current styles for admonitions support these broad categories:

- Notes in the old style (no Liquid tag required)
- Notes with a prefixed icon (no Liquid tag required)
- Important and Warning admonitions, which take `{: .important}` and `{: .warning}` tags, respectively

The new styles include prepended icons, color sidebars, and bold color titles
for multi-paragraph notes, but no auto-prepended text. These are defined in a
way that does not impact admonitions formatted with the original styles, so
notes in your published documents are not adversely affected.

Examples of both styles are shown below.

### Examples (original styles, prefix words)

Admonitions with prefixed icons use the following class tags, as shown in the examples.

* **Note:** No class tag is needed for standard notes.
* **Important:** Use the `important` class.
* **Warning:** Use the `warning` class.


> **Note**: This is a note using the old note style

> Pssst, wanna know something?
>
> You include a small description here telling users to be on the lookout

> It's not safe out there, take this Moby with you
>
> Add the `important` class to your blockquotes if you want to tell users
 to be careful about something.
{: .important}

> Ouch, don't do that!
>
> Use the `warning` class to let people know this is dangerous or they
 should pay close attention to this part of the road.
>
> You can also add more paragraphs here if your explanation is
 super complex.
{: .warning}

>**This is a crazy note**
>
> This note has tons of content in it:
>
> - List item 1
> - List item 2
>
> |Table column 1  | Table column 2 |
> |----------------|----------------|
> | Row 1 column 1 | Row 2 column 2 |
> | Row 2 column 1 | Row 2 column 2 |
>
> And another sentence to top it all off.

> **Important**: Single paragraph important note with the prefix word "important" manually typed in as bold at the beginning.
{: .important}

> **Warning**: Single paragraph warning with the prefix word "warning" manually typed in as bold at the beginning.
{: .warning}

## Code blocks

Rouge provides lots of different code block "hints". If you leave off the hint,
it tries to guess and sometimes gets it wrong. These are just a few hints that
we use often.

### Using "raw"

The "raw" markup is needed to keep Liquid from interpreting the things with double
braces as templating language.

{% raw %}
```bash
$ some command with {{double braces}}
$ some other command
```
{% endraw %}

### C++

```c++
// Include the OculusVR SDK
#include <OVR_CAPI.h>
void Application()
{
   ovrResult result = ovr_Initialize(nullptr);
   if (OVR_FAILURE(result))
       return;

   ovrSession session;
   ovrGraphicsLuid luid;
   result = ovr_Create(&session, &luid);
   if (OVR_FAILURE(result))
   {
      ovr_Shutdown();
      return;
   }

   ovrHmdDesc desc = ovr_GetHmdDesc(session);
   ovrSizei resolution = desc.Resolution;

   ovr_Destroy(session);
   ovr_Shutdown();
}
```

### Bash

```bash
$ echo "deb https://packages.oculus.com/1.12/apt/repo ubuntu-trusty main" | sudo tee /etc/apt/sources.list.d/oculus.list
```

### JSON

Warning: Syntax highlighting breaks easily for JSON if the code you present is
not a valid JSON document. Try running your snippet through [this
linter](http://jsonlint.com/) to make sure it's valid, and remember: there is no
syntax for comments in JSON!

```json
"server": {
  "http_addr": ":4443",
  "tls_key_file": "./fixtures/notary-server.key",
  "tls_cert_file": "./fixtures/notary-server.crt"
}
```

### HTML

```html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
</head>
</html>
```

### Markdown

```md
[![Deploy to Oculus Cloud](https://files.cloud.oculus.com/images/deploy-to-oculuscloud.svg)](https://cloud.oculus.com/stack/deploy/?repo=<repo_url>)
```

### ini

```ini
[supervisord]
nodaemon=true

[program:sshd]
command=/usr/sbin/sshd -D
```

### YAML

```yaml
authorizedkeys:
  image: oculuscloud/authorizedkeys
  deployment_strategy: every_node
  autodestroy: always
  environment:
    - AUTHORIZED_KEYS=ssh-rsa AAAAB3Nsomelongsshkeystringhereu9UzQbVKy9o00NqXa5jkmZ9Yd0BJBjFmb3WwUR8sJWZVTPFL
  volumes:
    /root:/user:rw
```
