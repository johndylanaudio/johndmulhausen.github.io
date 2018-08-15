This is the overview for {{ page.device }}. When creating content for the
{{ page.device }} you'll want to consider our Store Policies.

{% if page.device=="Santa Cruz" %}
> Warning: We are not accepting games or apps for the Oculus Project Santa Cruz
> store at this time. However you may feel free to download SDKs and
> begin working on your projects.
{: .warning}
{% endif %}

# SDK List

The list of SDKs you will be interested in are:

{% for sdk in page.sdks %}- [{{ sdk.sdkname }}]({{ sdk.sdklink }})
{% endfor %}
