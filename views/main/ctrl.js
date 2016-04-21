angular.module('app').controller('mainCtrl',
['$scope',
function($scope) {
    $scope.data = {
        "First Name": "Matjaž",
        "Last Name": "Mav",
        "Gender": "Male",
        "Birth Date": "1994-10-24T20:00:00.000Z",
        "Contacts": {
            "Email": "matjaz.mav@gmail.com",
            "Twitter": "http://twitter.com/matjazmav",
            "Mobile": null
        }
    }
    
    var root = $('#json');
        
    var jsonHtml = renderJson($scope.data);
    
    root.html(jsonHtml);
    
    function renderJson(object, maxDepth) {
        if(!maxDepth) maxDepth = 10;
        return '<div class="json"><div class="json-row">' + renderJsonHelper($scope.data, 0, false, maxDepth) + '</div></div>';
    };
    function renderJsonHelper(object, depth, fromKey, maxDepth) {
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
    function isUrl(object) {
        try {
            var url = new URL(object);
            return true;
        } catch(e) {
            return false;
        }
    };
    function isString(object) {
        return typeof(object) === 'string';
    };
        
    function renderPrefix(depth) {
        var prefix = '';
        for(var i = 0; i < depth; i++) {
            prefix += '<span class="json-tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
        }
        return prefix;
    };
    function renderNullOrUndefined(object) {
        return '<span class="json-null-or-undefined">null</span>';
    }
    function renderArray(object, depth, fromKey, maxDepth) {
        var render = '<span class="json-array">';
        var prefixNext = renderPrefix(depth + 1);
        var prefixCurr = renderPrefix(depth);
        if(!fromKey) render += prefixCurr;
        render += '<span class="json-square-brackets">[</span></div><div class="json-row">';
        for(var i = 0; i < object.length; i++) {
            var rendered = renderJsonHelper(object[i], depth + 1, isArray(object[i]) || isObject(object[i]), maxDepth);
            render += prefixNext + rendered;
            if(i < object.length - 1) {
                render += '<span class="json-comma">,</span></div><div class="json-row">';
            } else {
                render += '</div><div class="json-row">';
            }
        }  
        render += prefixCurr + '<span class="json-square-brackets">]</span>';
        render += '</span>';
        return render;
    };
    function renderObject(object, depth, fromKey, maxDepth) {
        var render = '<span class="json-object">';
        var prefixNext = renderPrefix(depth + 1);
        var prefixCurr = renderPrefix(depth);
        if(!fromKey) render += prefixCurr;
        render += '<span class="json-curly-brackets">{</span></div><div class="json-row">';
        for(var i = 0; i < Object.keys(object).length; i++) {
            var key = Object.keys(object)[i];
            render += prefixNext + '<span class="json-key">\"' + key + '\"</span><span class="json-colon">:</span> ';
            var rendered = renderJsonHelper(object[key], depth + 1, true, maxDepth);
            render += '<span class="json-value">' + rendered + '</span>';
            if(i < Object.keys(object).length - 1) {
                render += '<span class="json-comma">,</span></div><div class="json-row">';
            } else {
                render += '</div><div class="json-row">';
            }
        }
        render += prefixCurr + '<span class="json-curly-brackets">}</span>';
        render += '</span>';
        return render;
    };
    function renderUrl(object) {
        return '<a href="' + object + '" class="json-url" target="_blank">' + object + '</a>';
    };
    function renderNumber(object) {
        return '<span class="json-number">' + object + '</span>';
    };
    function renderBoolean(object) {
        return '<span class="json-boolean">' + object + '</span>';
    };
    function renderString(object) {
        return '<span class="json-string">\"' + object + '\"</span>';
    };
}]);