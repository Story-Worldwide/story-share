Story Share jQuery Plugin
==================================================


`Version 0.0.2`

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
Facebook's most basic sharing feature provides the ability to share only a URL. Facebook will then use the [opengraph](http://ogp.me/) protocol. See this [article from David Walsh](http://davidwalsh.name/facebook-meta-tags)  on more information on the using the open graph protocol. This is different from the other included services as the basic sharing feature does not provide the ability to customize share text, so there is a limited amount of required data attributes on the anchor tag.

* `data-type` => `facebook-simple` *always*  
* `data-url` => `http://example.com`

Example:

```
<a href="#" class="share" data-type="facebook-simple" data-url="http://foobar.com">Click to Share on Facebook</a>
```

Facebook (Complex)
---
Facebook's `dialog/feed` endpoint gives us a more custom share experience. The only caveat is that a Facebook Application ID needs to be provided (typically it will be done in the instantiation of the plugin, see below for an example).

For any of these data elements or for more information refer to [Facebook's documentation](https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.3) for this API endpoint.

* `data-type` => `facebook-complex` *always*  
* `data-redirect_uri` => You should only change this if you need to. Because the `dialog/feed` endpoint requires a redirect that will send the user to a specific page , we are simply redirecting to the same page with a hashbag added to the end of the URL, which this plugin has a handler to close the window when redirecting.
* `data-picture` => `http://example.com/image.jpg`
* `data-caption` => `Ready for Isomorphic Javascript?`
* `data-link` => `http://example.com/isomorphic-javascript`
* `data-source` => From Facebook's documentation The URL of a media file (either SWF or MP3) attached to this post. If SWF, you must also specify picture to provide a thumbnail for the video.
* `data-name` => From Facebook's documentation: The name of the link attachment.
* `data-description` => `The latest article from my blog that discusses isomorphic javascript.`
* `data-properties` => From Facebook's documentation: A JSON object of key/value pairs which will appear in the stream attachment beneath the description, with each property on its own line. Keys must be strings, and values can be either strings or JSON objects with the keys text and href.
* `data-actions` => From Facebook's documentation: A JSON array containing a single object describing the action link which will appear next to the 'Comment' and 'Like' link under posts. The contained object must have the keys name and link.
* `data-ref` => From Facebook's documentation: This argument is a comma-separated list, consisting of at most 5 distinct items, each of length at least 1 and at most 15 characters drawn from the set '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'. Each category is used in Facebook Insights to help you measure the performance of different types of post

Example:

In the header:

```
jQuery(document).ready(function () {
  $('a.share').storyShare({
    fbAppId: 123456789012345,
  });
});
```

In the body:


```
 <a class="share" data-name="Isomorphic Javascript" data-link="http://example.com/isomorphic-javascript" data-description="The latest article from my blog that discusses isomorphic javascript." data-type="facebook-complex" data-picture="http://example.com/image.jpg" data-caption="Ready for Isomorphic JavaScript?" href="#">Share on Facebook</a>
```


Twitter
---
Sharing with twitter is more straight forward and here are the data attributes:

* `data-type` => `twitter` *always*  
* `data-url` => `http://example.com`  
* `data-text` => `Isomorphic JavaScript, is this our future?`
* `data-hashtags` => `js,isomorphism` this is optional and it would be comma delimited

Example:

```
<a href="#" class="share" data-type="twitter" data-url="http://example.com" data-text="Isomorphic JavaScript, is this our future?" data-hashtags="js,isomorphism">Click to Share on Twitter</a>
```

Google Plus
---
Like Facebook, Google uses opengraph tags for sharing so there is a limited amount of required data attributes on the anchor tag:

* `data-type` => `google-plus` *always*  
* `data-url` => `http://example.com`

Example:

```
<a href="#" class="share" data-type="google-plus" data-url="http://example.com">Click to Share on Google Plus</a>
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
<a href="#" class="share" data-type="linkedin" data-url="http://example" data-source="My Shiny Blog" data-title="Isomorphic JavaScript, is this our future?" data-summary="The latest article from my blog that discusses isomorphic javascript">Click to Share on LinkedIn</a>
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



