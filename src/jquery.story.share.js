(function ($, window, document, undefined) {


    var pluginName = "storyShare",
        defaults = {

            windowWidth: 500,
            windowHeight: 500,
            socialProviders: {
                facebook_simple: {
                    urlBase: 'https://www.facebook.com/sharer/sharer.php?u={url}'

                },
                facebook_complex: {
                    urlBase: 'https://www.facebook.com/dialog/feed?app_id={app_id}&caption={caption}&description={description}&display={display}&e2e="{e2e}"&link={link}&locale={locale}&message={message}&name={name}&next={next}&domain={domain}&origin={origin}&relation={relation}&frame={frame}&result={result}&picture={picture}&sdk=joey'
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

            }
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

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {



        linkHandler: function (e) {


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
        facebookUrlHandler: function (e) {
            if(typeof FB === 'undefined' || !FB) {
            $.ajaxSetup({ cache: true });
            $.getScript('//connect.facebook.net/en_UK/all.js', function() {
                FB.init({
                    appId: '339511862916474'
                });
                callback();
            });
        } else {
            callback();
        }
            FB.ui({
                method: 'feed',
                name: "",
                link: 'http://shell.jsfiddle.net',
                picture: 'placehold.it/350x150',
                caption: 'this is caption',
                description: 'this is description'
            });


        },

        shareHandler: function () {
                this.linkHandler();
        },

        init: function () {


            $(this.element).on('click', this.shareHandler);

        },
        removeURLParameter: function (url, parameter) {
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

        generateSocialUrl: function () {


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


            tokens.forEach(function (element, index, array) {

                override = null;
                element = element.replace('{', '').replace('}', '');

                if (element in overrides) {
                    override = overrides[element];
                }

                var attributeName = 'data-' + element.replace('{', '').replace('}', ''),
                    dataAttribute = override || $el.attr(attributeName);


                dataAttribute = dataAttribute !== undefined ? dataAttribute : null;

                if (null === dataAttribute) {
                    socialUrl = parentObject.removeURLParameter(socialUrl, attributeName.replace('data-', ''));
                }
                socialUrl = socialUrl.replace('{' + element + '}', encodeURIComponent(dataAttribute));
            });
            this.socialUrl = socialUrl;

        }
    };


    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);


