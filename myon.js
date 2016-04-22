var myon = (function() {
    return {
        renderJson: function(object, tabSize, maxDepth) {
            if(typeof tabSize === 'undefined') tabSize = 4;
            if(tabSize < 1) tabSize = 1;
            if(typeof maxDepth === 'undefined') maxDepth = 10;
            if(maxDepth < 1) maxDepth = 1;
            
            var lineNo = 1;
            
            return renderJson(object);
            
            function renderJson(object) {
                return '<div class="json"><div class="json-row"><span class="json-line-number">' + (lineNo++) + '</span>' + renderJsonHelper(object, 0, false) + '</div></div>';
            };
            function renderJsonHelper(object, depth, fromKey) {
                if(depth === maxDepth) return '<span class="json-overflow">...</span>';
                if(isNullOrUndefined(object)) {
                    return renderNullOrUndefined(object);
                } else if(isArray(object)) {
                    return renderArray(object, depth, fromKey, maxDepth);
                } else if(isObject(object)) {
                    return renderObject(object, depth, fromKey, maxDepth);
                } else if(isNumber(object)) {
                    return renderNumber(object);
                } else if(isBoolean(object)) {
                    return renderBoolean(object);
                } else if(isEmail(object)) {
                    return renderEmail(object);
                } else if(isSkypeUrl(object)) {
                    return renderSkypeUrl(object);
                } else if(isUrl(object)) {
                    return renderUrl(object);
                } else if(isString(object)) {
                    return renderString(object);
                } 
                console.error('Can\'t render: ', object);
                return '<span class="json-error">Can\'t render, check console.</span>';
            };
            function isNullOrUndefined(object) {
                return object === null ||  object === undefined;
            };
            function isArray(object) {
                return object instanceof Array;
            };
            function isObject(object) {
                return (object instanceof Object) && !isArray(object);
            };
            function isNumber(object) {
                return typeof(object) === 'number';
            };
            function isBoolean(object) {
                return typeof(object) === 'boolean';
            };
            function isSkypeUrl(object) {
                var skypeUrlPatern = new RegExp(/^skype:/i);
                return skypeUrlPatern.test(object) && isUrl(object);
            };
            function isUrl(object) {
                try {
                    var url = new URL(object);
                    return true;
                } catch(e) {
                    return false;
                }
            };
            function isEmail(object) {
                var emailPatter = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i);
                return emailPatter.test(object);  
            };
            function isString(object) {
                return typeof(object) === 'string';
            };
            function renderPrefix(depth) {
                var prefix = '';
                for(var i = 0; i < depth; i++) {
                    prefix += '<span class="json-tab">';
                    for(var j = 0; j < tabSize; j++) {
                        prefix += '&nbsp;';
                    }
                    prefix += '</span>';
                }
                return prefix;
            };
            function renderNullOrUndefined(object) {
                return '<span class="json-null-or-undefined">null</span>';
            }
            function renderArray(object, depth, fromKey) {
                var render = '';//'<span class="json-array">';
                var prefixNext = renderPrefix(depth + 1);
                var prefixCurr = renderPrefix(depth);
                if(!fromKey) render += prefixCurr;
                render += '<span class="json-square-brackets">[</span></div><div class="json-row"><span class="json-line-number">' + (lineNo++) + '</span>';
                for(var i = 0; i < object.length; i++) {
                    var rendered = renderJsonHelper(object[i], depth + 1, isArray(object[i]) || isObject(object[i]), maxDepth);
                    render += prefixNext + rendered;
                    if(i < object.length - 1) {
                        render += '<span class="json-comma">,</span></div><div class="json-row"><span class="json-line-number">' + (lineNo++) + '</span>';
                    } else {
                        render += '</div><div class="json-row"><span class="json-line-number">' + (lineNo++) + '</span>';
                    }
                }  
                render += prefixCurr + '<span class="json-square-brackets">]</span>';
                // render += '</span>';
                return render;
            };
            function renderObject(object, depth, fromKey) {
                var render = '';//'<span class="json-object">';
                var prefixNext = renderPrefix(depth + 1);
                var prefixCurr = renderPrefix(depth);
                if(!fromKey) render += prefixCurr;
                render += '<span class="json-curly-brackets">{</span></div><div class="json-row"><span class="json-line-number">' + (lineNo++) + '</span>';
                for(var i = 0; i < Object.keys(object).length; i++) {
                    var key = Object.keys(object)[i];
                    render += prefixNext + '<span class="json-key">\"' + key + '\"</span><span class="json-colon">:</span> ';
                    var rendered = renderJsonHelper(object[key], depth + 1, true, maxDepth);
                    // render += '<span class="json-value">' + rendered + '</span>';
                    render += rendered;
                    if(i < Object.keys(object).length - 1) {
                        render += '<span class="json-comma">,</span></div><div class="json-row"><span class="json-line-number">' + (lineNo++) + '</span>';
                    } else {
                        render += '</div><div class="json-row"><span class="json-line-number">' + (lineNo++) + '</span>';
                    }
                }
                render += prefixCurr + '<span class="json-curly-brackets">}</span>';
                // render += '</span>';
                return render;
            };
            function renderNumber(object) {
                return '<span class="json-number">' + object + '</span>';
            };
            function renderBoolean(object) {
                return '<span class="json-boolean">' + object + '</span>';
            };
            function renderSkypeUrl(object) {
                var skypeUserName = object.replace('skype:', '').replace('?call', '').replace('?chat', '');
                return '<span class="json-string">\"<a href="' + object + '" class="json-url" target="_blank">' + skypeUserName + '</a>\"</span>';
            };
            function renderUrl(object) {
                return '<span class="json-string">\"<a href="' + object + '" class="json-url" target="_blank">' + object + '</a>\"</span>';
            };
            function renderEmail(object) {
                return '<span class="json-string">\"<a href="mailto:' + object + '" class="json-url" target="_blank">' + object + '</a>\"</span>';
            };
            function renderString(object) {
                return '<span class="json-string">\"' + object + '\"</span>';
            };
        } 
    };
})();