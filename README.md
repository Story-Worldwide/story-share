Story Share jQuery Plugin Beta
==================================================


This jQuery plugin allows you to share pages on `twitter`, `facebook`, `google plus`, `linkedin` and `pinterest` custom share text for Facebook is not yet supported.

Documentation
--------------------------------------

Include `jquery.story.share.min.js` in your project as you would any jquery plugin.

To apply a this plugin, simply run the plugin on a standard html anchor element.


How to Use
----
```
jQuery(document).ready(function(){
    $('a.share').storyShare();
});
```

instantiate the storyShare plugin on your anchor html elements. Then create the anchor elements with an `href="#"` and data attributes corresponding to the necessary attributes (see below for a run down), for example, for twitter:

```
<a href="#" class="share" data-type="twitter" data-url="http://urltoshare.com" data-text="text to share" data-hashtags="comma,delimited,hashtags">
```


Options
---
This plugin is fully customizable and can be extended to accept other sharing services. You can pass in your Facebook application ID if you wish to use the experimental custom share feature for Facebook (which aims to allow customized Facebook shares):

```
jQuery(document).ready(function(){
    $('a.share').storyShare({
        fbAppId: '360469130699543'
    });
});

```




Sharing Services Included
===


Facebook (Simple)
---
Facebook's most basic sharing feature provides the ability to share only a URL. Facebook will then use the [opengraph](http://ogp.me/) protocol. See this [article from David Walsh](http://davidwalsh.name/facebook-meta-tags)  on more information on the using the open graph protocol. This is different from the other included services as the basic sharing feature does not provide the ability to customize share text, so there is a limited amount of required data attributes on the anchor tag:

* `data-type` => `facebook-simple` *always*  
* `data-url` => `http://example.com`

Example:

```
<a href="#" class="share" data-type="facebook-simple" data-url="http://foobar.com">Click to Share on Facebook</a>
```

Twitter
---
Sharing with twitter is more straight forward and here are the data attributes:

* `data-type` => `twitter` *always*  
* `data-url` => `http://example.com`  
* `data-text` => `somorphic JavaScript, is this our future?`
* `data-hashtags` => `js,isomorphism` this is optional and it would be comma delimited

Example:

```
<a href="#" class="share" data-type="twitter" data-url="http://foobar.com" data-text="The latest and greatest!" data-hashtags="summer2015,nomorecold">Click to Share on Twitter</a>
```

Google Plus
---
Like Facebook, Google uses opengraph tags for sharing so there is a limited amount of required data attributes on the anchor tag:

* `data-type` => `google-plus` *always*  
* `data-url` => `http://example.com`

Example:

```
<a href="#" class="share" data-type="google-plus" data-url="http://foobar.com">Click to Share on Google Plus</a>
```

LinkedIn
---
Sharing with Twitter is more straight forward and here are the data attributes:

* `data-type` => `linkedin` *always*  
* `data-url` => `http://example.com`  
* `data-title` => `Isomorphic JavaScript, is this our future?`
* `data-source` => `My Shiny Blog` (optional)
* `data-summary` => `The latest article from my blog that discusses isomorphic javascript` (optional)

Example:

```
<a href="#" class="share" data-type="linkedin" data-url="http://foobar.com" data-source="My Shiny Blog" data-title="Isomorphic JavaScript, is this our future?" data-summary="The latest article from my blog that discusses isomorphic javascript">Click to Share on LinkedIn</a>
```

Pinterest
---
Sharing with Pinterest is more straight forward and here are the data attributes:

* `data-type` => `pinterest` *always*  
* `data-url` => `http://example.com`  
* `data-media` => `http://example.com/image.jpg`
* `data-description` => `Isomorphic JavaScript, is this our future?` (optional)


Example:

```
<a href="#" class="share" data-type="pinterest" data-url="http://foobar.com" data-description="My Shiny Blog" data-media="http://example.com/image.jpg">Click to Share on Pinterest</a>
```



