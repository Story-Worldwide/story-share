/*global jQuery */

/*!
 * Sharing plugin for Story Worldwide
 * Original author: @matgargano
 * Licensed under the MIT license
 * Version 0.0.3
 */


;(function($, window, document, undefined) {


    var pluginName = "storyShare",
        defaults = {

            windowWidth: 500,
            windowHeight: 300,
            relativeMediaUrls: true,
            mediaBaseUrl: window.location.href.replace(window.location.hash, '').replace('#', ''),
            currentUrlPlaceholder: '{{current}}',
            mediaAttributes: {
                pinterest: [
                    'media'
                ],
                facebook_complex: [
                    'picture'
                ]

            },
            shareUrlAttributes: {
                facebook_complex: [
                    'link'
                ],
                facebook_simple: [
                    'url'
                ],
                twitter: [
                    'url'
                ],
                google_plus: [
                    'url'
                ],
                linkedin: [
                    'url'
                ],
                pinterest: [
                    'url'
                ]
            },
            socialProviders: {
                facebook_simple: {
                    urlBase: 'https://www.facebook.com/sharer/sharer.php?u={url}'

                },
                facebook_complex: {
                    urlBase: 'https://www.facebook.com/v2.3/dialog/feed?app_id={app_id}&redirect_uri={redirect_uri}&link={link}&picture={picture}&caption={caption}&description={description}&title={title}&name={name}&properties={properties}&actions={actions}&ref={ref}&display=popup',
                    overrides: {
                        redirect_uri: window.location.href + '#story_close_window'
                    }
                },
                twitter: {
                    urlBase: 'https://twitter.com/intent/tweet?url={url}&text={text}&hashtags={hashtags}'
                },
                google_plus: {
                    urlBase: 'https://plus.google.com/share?url={url}'

                },
                linkedin: {
                    urlBase: 'http://www.linkedin.com/shareArticle?mini=true&url={url}&source={source}&title={title}&summary={summary}'

                },
                pinterest: {
                    urlBase: 'https://pinterest.com/pin/create/button/?url={url}&media={media}&description={description}'
                }

            },
            debug: false
        };


    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend(true, {}, defaults, options);

        if ('fbAppId' in this.options) {
            this.options = $.extend(true, this.options, {
                socialProviders: {
                    facebook_complex: {
                        overrides: {
                            app_id: this.options.fbAppId
                        }
                    },
                    facebook_simple: {
                        overrides: {
                            app_id: this.options.fbAppId
                        }
                    }
                }
            });
        }

        this.shareHandler = this.shareHandler.bind(this);
        //this.generateSocialUrl = this.generateSocialUrl.bind(this);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {



        linkHandler: function() {


            var px = Math.floor(((screen.availWidth || 1024) - this.options.windowWidth) / 2),
                py = Math.floor(((screen.availHeight || 700) - this.options.windowHeight) / 2);


            this.generateSocialUrl();

            if (!this.socialUrl) {
                return true;
            }
            var popup = window.open(this.socialUrl, "social",
                "width=" + this.options.windowWidth + ",height=" + this.options.windowHeight +
                ",left=" + px + ",top=" + py +
                ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
            if (popup) {
                popup.focus();
                if ($(this.element).preventDefault) $(this.element).preventDefault();
                $(this.element).returnValue = false;
            }

            return !!popup;
        },


        shareHandler: function() {
            this.linkHandler();
        },

        closeWindowIfHashExists: function() {
            if (window.location.hash.indexOf('#story_close_window') !== -1) {
                window.close();
            }
        },
        init: function() {

            this.closeWindowIfHashExists();
            $(this.element).on('click', this.shareHandler);

        },
        removeURLParameter: function(url, parameter) {
            var urlparts = url.split('?');
            if (urlparts.length >= 2) {

                var prefix = encodeURIComponent(parameter) + '=';
                var pars = urlparts[1].split(/[&;]/g);

                for (var i = pars.length; i-- > 0;) {
                    if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                        pars.splice(i, 1);
                    }
                }

                url = urlparts[0] + '?' + pars.join('&');
                return url;
            } else {
                return url;
            }
        },

        generateSocialUrl: function() {

            var $el = $(this.element),
                type = $el.attr('data-type').replace('-', '_'),
                parentObject = this,
                socialProvider = type in this.options.socialProviders ? this.options.socialProviders[type] : null;

            if (null === socialProvider) {

                console.log(type + ' does not exist as a social provider.');
                this.socialUrl = null;
                return;

            }

            var socialUrl = socialProvider.urlBase,
                pattern = /{([^}]*)}/g,
                tokens = socialUrl.match(pattern) || [],
                overrides = socialProvider.overrides || {};


            tokens.forEach(function(element) {

                var override = null;
                element = element.replace('{', '').replace('}', '');

                if (element in overrides) {
                    override = overrides[element];
                }

                var processedElement = element.replace('{', '').replace('}', ''),
                    attributeName = 'data-' + processedElement,
                    dataAttribute = override || $el.attr(attributeName);

                // handle relative URLs
                if ( parentObject.options.relativeMediaUrls && dataAttribute && type in parentObject.options.mediaAttributes ) {

                    if (parentObject.options.mediaAttributes[type].indexOf(processedElement) > -1 ) {
                        dataAttribute = parentObject.options.mediaBaseUrl + dataAttribute;
                    }
                }

                // handler for sharing current url

                if ( dataAttribute === parentObject.options.currentUrlPlaceholder && parentObject.options.shareUrlAttributes[type].indexOf(processedElement) > -1 ) {

                    dataAttribute = window.location.href;

                }


                dataAttribute = dataAttribute !== undefined ? dataAttribute : null;

                if (null === dataAttribute) {
                    socialUrl = parentObject.removeURLParameter(socialUrl, attributeName.replace('data-', ''));
                }



                socialUrl = socialUrl.replace('{' + element + '}', encodeURIComponent(dataAttribute));
            });
            this.socialUrl = socialUrl;

        }
    };


    $.fn[pluginName] = function(options) {
        if (options && options.debug) {
            return new Plugin(this, options);
        } else {
            return this.each(function() {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" + pluginName,
                        new Plugin(this, options));
                }
            });
        }
    };

})(jQuery, window, document);
