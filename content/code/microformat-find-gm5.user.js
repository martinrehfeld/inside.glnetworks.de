---
  layout: none
  is_hidden: true
---
//
//  microformat-find-gm5.user.js
//
//  Find Microformats on a page and display a context menu
//  with available options.
//  NEW: Added compatibility with Greasemonkey 0.6.4 (Firefox 1.5)
//
//  Martin Rehfeld
//  GL Networks
//  2006.06.05
//
//  Version 0.06.2 (2006.06.06)
//  - fixed problem with mixed/multiple Microformats on the same page
//  Version 0.06.1 (2006.06.05)
//  - fixed compatibility with Greasemonkey 0.5+ (new DOM accessors)
//
//  previous version(s) by: David Janes, BlogMatrix
//  Version 0.05.2 (2005.11.23)
//  - added "print" function
//  Version 0.05.1 (2005.11.23)
//  - fixed bug in walk algorithm
//  Version 0.05 (2005.11.23)
//  - hatom removed
//  - hAtom added
//  Version 0.04 (2005.11.02)
//  - added Mark Pilgrim's XPATH
//  - bug fixes for vcard relating to fax
//  Version 0.03 (2005.08.15)
//  - bug fixes for vcalendar
//  Version 0.02 (2005.08.13)
//  - added vcalendar
//  Version 0.01 (2005.08.12)
//  - initial verion
//
//  This script is not meant to be as monolithic as it looks -- it should be
//  broken into separate scripts, one for each microformat, that detect
//  the master script.
//
//  Thanks to:
//  - David Janes (original script)
//  - Vyacheslav Smolin (HTML2XHTML)
//  - Mark Pilgrim (greasemonkey stuff)
//  - Bud Gibson (finding classes)
//  - Bob Ippolito (MochKit)
//  - Doc Crowley (buttons)
//  - Simon Wilson (base64 encoding, data: uri inspiration)
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "microformat-find-gm5", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          microformat-find-gm5
// @namespace     http://inside.glnetworks.de
// @description   Find microcontent on a webpage
// @include       http://*
// ==/UserScript==

window.debugging = 0
window.mf_globals = new Object()
window.mf_globals.elements = new Object()

/*
 * Event handler for showing the menu
 */
function mf_eventhandler1(evt,populate_callback,mfElement,containerDivElement,menuDivElement) {
            if (window.mf_globals.mf_active) {
                window.mf_globals.mf_active.style.visibility = 'hidden'
                window.mf_globals.mf_active = null
            }

            if (!menuDivElement.mf_populated) {
                populate_callback(mfElement, menuDivElement)
                menuDivElement.mf_populated = 1
            }

            containerDivElement.style.visibility = 'visible'
            window.mf_globals.mf_active = containerDivElement
            evt.preventDefault();
}

/*
 * Event handler for closing the menu
 */
function mf_eventhandler2(evt,containerDivElement) {
            containerDivElement.style.visibility = 'hidden'
            window.mf_globals.mf_active = null
}

function mf_find(mc_name, image_uri, populate_callback)
{
	// var xpath = "//*[contains(@class,'" + mc_name + "')]"
	var xpath = ".//*[contains(concat(' ', normalize-space(@class) ,' '), ' " + mc_name + " ')]"; 
    var allDivs = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allDivs.snapshotLength; i++) {
        var mfElement = allDivs.snapshotItem(i);
        var mfID = 'mfID'+mc_name+i;
    
        /*
         *  The microcontent image, floating above the div and visible
         *  but partially opaque
         */
        var imageDivElement = document.createElement("div");
	imageDivElement.setAttribute('mfID',mfID);
        imageDivElement.style.position = 'relative';
        imageDivElement.style.zIndex = 998;
        
        mfElement.insertBefore(imageDivElement, mfElement.firstChild)
                
        var image1Element = document.createElement("img")
	image1Element.setAttribute('mfID',mfID);
        image1Element.setAttribute('src', image_uri)
        image1Element.style.opacity = '.2';
        image1Element.setAttribute('border', "0")
        
        imageDivElement.appendChild(image1Element)
        
        /*
         *  A div that floats above the image above and starts off
         *  non-visible until the user enables it. Note that this is
         *  a child of the div above, to get the positioning correct!
         */
        var containerDivElement = document.createElement("div");
	containerDivElement.setAttribute('mfID',mfID);
        containerDivElement.style.position = 'absolute';
        containerDivElement.style.zIndex = '999';
        containerDivElement.style.visibility = 'hidden';
        containerDivElement.style.top = '0px';
        
        imageDivElement.appendChild(containerDivElement)

        var image2Element = document.createElement("img")
	image2Element.setAttribute('mfID',mfID);
        image2Element.setAttribute('src', image_uri)
        image2Element.style.opacity = '1.0';
        image2Element.setAttribute('border', "0")
        
        containerDivElement.appendChild(image2Element)

        // the div that displays the menu
        var menuDivElement = document.createElement("div");
	menuDivElement.setAttribute('mfID',mfID);
        menuDivElement.style.position = 'absolute';
        menuDivElement.style.top = '0px';
        menuDivElement.style.left = '79px';
        menuDivElement.style.minWidth = '250px';
        menuDivElement.style.minHeight = '100px';
        menuDivElement.style.border = 'solid gray 1px';
        menuDivElement.style.backgroundColor = 'white';
        menuDivElement.style.padding = '0px';
        menuDivElement.style.margin = '0px';
        menuDivElement.style.lineHeight = '110%';
        menuDivElement.style.overflow = 'hidden';

        containerDivElement.appendChild(menuDivElement)
        
        /*
         *  This implements the menu popup event, on user click.
         */
        window.mf_globals.elements[mfID] = new Object()
        window.mf_globals.elements[mfID].mfElement = mfElement;
        window.mf_globals.elements[mfID].containerDivElement = containerDivElement;
        window.mf_globals.elements[mfID].menuDivElement = menuDivElement;
        window.mf_globals.elements[mfID].populate_callback = populate_callback;
        image1Element.addEventListener("click", function(evt) {
            var mfID = this.getAttribute('mfID');
            mf_eventhandler1(evt,
                             window.mf_globals.elements[mfID].populate_callback,
                             window.mf_globals.elements[mfID].mfElement,
                             window.mf_globals.elements[mfID].containerDivElement,
                             window.mf_globals.elements[mfID].menuDivElement);
        }, true);

        image2Element.addEventListener("click", function(evt) {
            var mfID = this.getAttribute('mfID');
            mf_eventhandler2(evt,window.mf_globals.elements[mfID].containerDivElement);
        }, true);

        menuDivElement.addEventListener("click", function(evt) {
            var mfID = this.getAttribute('mfID');
            mf_eventhandler2(evt,window.mf_globals.elements[mfID].containerDivElement);
        }, true);
    }
}

/*
 *  Add menu items to the microformat popup menu
 */
window.mf_add_menu = function(menuElement, uri, text) {
    // <li>
    itemElement = document.createElement("div");
    itemElement.style.paddingTop = '1px';
    itemElement.style.paddingBottom = '1px';
    itemElement.style.paddingLeft = '3px';
    itemElement.style.paddingRight = '3px';
    itemElement.style.margin = '0px';

    menuElement.appendChild(itemElement)

    // <a>
    aElement = document.createElement("a");
    aElement.setAttribute('href', uri)
    aElement.style.textDecoration = 'none';
    aElement.style.color = '#31757B';
    aElement.style.fontFamiliy = 'Verdana, Lucida,  Arial, Helvetica, sans-serif';
    aElement.style.fontSize = 'x-small';
    aElement.style.fontWeight = 'bold';

    aElement.addEventListener("mouseover", function(evt) {
        this.parentNode.style.background = "#EEE"
    }, true);
    aElement.addEventListener("mouseout", function(evt) {
        this.parentNode.style.background = "white"
    }, true);
    itemElement.appendChild(aElement)
    

    // text in the <a>
    textNode = document.createTextNode(text)
    aElement.appendChild(textNode)
}

window.mf_add_label = function(menuElement, text) {
    // <li>
    itemElement = document.createElement("div");
    itemElement.style.color = '#105050';
    itemElement.style.fontFamily = 'Verdana, Lucida,  Arial, Helvetica, sans-serif';
    itemElement.style.fontSize = 'x-small';
    itemElement.style.fontWeight = 'bold';
    itemElement.style.paddingTop = '1px';
    itemElement.style.paddingBottom = '1px';
    itemElement.style.paddingLeft = '3px';
    itemElement.style.paddingRight = '3px';
    itemElement.style.margin = '0px';
    itemElement.style.textDecoration = 'none';

    menuElement.appendChild(itemElement)

    // text in the <a>
    textNode = document.createTextNode(text)
    itemElement.appendChild(textNode)
}

/*
 *  Mooched from MochiKit
 */
window.nodeWalk = function (node, visitor) {
    var nodes = [node];
    while (nodes.length) {
        var res = visitor(nodes.shift());
        if (res) {
        	var nnodes = []
        	
            for (var ri = 0; ri < res.length; ri++) {
                nnodes[ri] = res[ri]
            }
            for (var ni = 0; ni < nodes.length; ni++) {
                nnodes[ri + ni] = nodes[ni]
            }
            
            nodes = nnodes
        }
    }
};

window.scrapeText = function (node) {
	if (window.debugging) {
		GM_log("START: node.tagName:" + node.tagName + " node.nodeValue:" + typeof(nodeValue) + " node.length:" + node.childNodes.length)
	}
    var rval = [];
    window.nodeWalk(node, function (node) {
		if (window.debugging) {
			GM_log("WALK: node.tagName:" + node.tagName + " node.nodeValue:" + typeof(nodeValue) + " node.length:" + node.childNodes.length)
		}
        var nodeValue = node.nodeValue;
        if (typeof(nodeValue) == 'string') {
            rval.push(nodeValue);
        }
        return node.childNodes;
    });
    return rval.join(" ");
};


/*
 *  Return an object that ...
 *
 *  XXX: For complex microcontent elements, this is somewhat useless, but 
 *  could by the spark for a better idea.
 */
window.mf_elements = function(mfElement, classArray, include_root) {
    elements = new Object()
    
    /*
     *  Cache regular expression objects
     */
    reArray = new Array()
    for (var cai = 0; cai < classArray.length; cai++) {
        reArray[cai] = new RegExp('\\b' + classArray[cai] + '\\b');
    }

    /*
     *  Go through all the children of mfElement and
     *  find anything in the classArray.
     */
    var allElements = mfElement.getElementsByTagName('*');
    
    for (var ai = 0; ai <= allElements.length; ai++) {
    	if (ai == allElements.length) {
    		// HACK!
    		if (include_root) {
	    		var element = mfElement
	    	} else {
	    		break
	    	}
    	} else {
	        var element = allElements[ai]
	    }
        
        for (var ri = 0; ri < reArray.length; ri++) {
            realClassName = classArray[ri]
            
            if (element.className.match(reArray[ri])) {
            } else if (element.rel && element.rel.match(reArray[ri])) {
            } else if (element.tagName == realClassName) {
            } else {
            	continue;
            }
            
            // the text 
            value = window.scrapeText(element)
            if (value.length) {
                element.mf_text = value
            }
            
            key = realClassName + '.nodes'
            if (elements[key]) {
                elements[key].push(element)
            } else {
                elements[key] = new Array(element)
            }
        }
    }
    
    return  elements
}

window.mf_element_href = function(e_map, key, alternate) {
    var vs = e_map[key + ".nodes"]
    if (!vs) {
        return  alternate
    }
    
    var v = vs[0]
    if (v.href) {
        return  v.href
    } else {
        return  alternate
    }
}

window.mf_element_text = function(e_map, key, alternate) {
    var vs = e_map[key + ".nodes"]
    if (!vs) {
        return  alternate
    }
    
    var v = vs[0]
    if (v.title) {
        return  v.title
    } else if (v.mf_text) {
        return  v.mf_text
    } else {
        return  alternate
    }
}

window.mf_element_html = function(e_map, key, alternate) {
    var vs = e_map[key + ".nodes"]
    if (!vs) {
        return  alternate
    }
    
    return	window.h2x_get_xhtml(vs[0])
}

window.mf_element_link_list = function(e_map, key) {
    var vs = e_map[key + ".nodes"]
    if (!vs) {
        return  alternate
    }
    
    var result_list = []
    for (var vi = 0; vi < vs.length; vi++) {
        var v = vs[vi]
        
        if (v.href) {
            result_list.push(v.href)
        }
    }
    
    return  result_list
}

window.mf_element_text_list = function(e_map, key) {
    var vs = e_map[key + ".nodes"]
    if (!vs) {
        return  alternate
    }
    
    var result_list = []
    for (var vi = 0; vi < vs.length; vi++) {
        var v = vs[vi]
        
        if (v.title) {
            result_list.push(v.title)
        } else if (v.mf_text) {
            result_list.push(v.mf_text)
        }
    }
    
    return  result_list
}

/*
 *  This returns (href, text) pairs
 */
window.mf_element_textlink_list = function(e_map, key) {
    var vs = e_map[key + ".nodes"]
    if (!vs) {
        return  alternate
    }
    
    var result_list = []
    for (var vi = 0; vi < vs.length; vi++) {
        var v = vs[vi]
        
        if (v.href) {
            result_list.push(v.href)

            if (v.title) {
                result_list.push(v.title)
            } else if (v.mf_text) {
                result_list.push(v.mf_text)
            } else {
                result_list.push("")
            }
        }
    }
    
    return  result_list
}

/*
 *  From: Simon Wilson
 *  http://simon.incutio.com/archive/2003/08/11/selfContained
 */
window.base64encode = function(str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out; var i; var len;
    var c1; var c2; var c3;
    var len = str.length;
    var i = 0;
    out = "";
    while(i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if(i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if(i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

window.mf_fix_string = function(str, newline_replace) {
    if (!str) {
        return  ""
    }
    
    if (!newline_replace) {
        newline_replace = " "
    }
    
    // leading and trailing spaces    
    str = str.replace(/^\s*/, "")
    str = str.replace(/\s*$/m, "")

    // spaces around newlines
    var rex = /\n\s+/m
    while (rex.test(str)) str = str.replace(rex, '\n')
    
    rex = /\s+\n/m
    while (rex.test(str)) str = str.replace(rex, '\n')
    
    // newlines
    rex = /\n/m
    while (rex.test(str)) str = str.replace(rex, newline_replace)
    
    // multispaces
    rex = / \s+/m
    while (rex.test(str)) str = str.replace(rex, ' ')
    
    return  str
}

/*==============================================================================

                             HTML2XHTML Converter 1.0
                             ========================
                       Copyright (c) 2004 Vyacheslav Smolin


Author:
-------
Vyacheslav Smolin (http://www.richarea.com, http://html2xhtml.richarea.com,
re@richarea.com)

About the script:
-----------------
HTML2XHTML Converter (H2X) generates a well formed XHTML string from a HTML DOM
object.

Requirements:
-------------
H2X works in  MS IE 5.0 for Windows or above,  in Netscape 7.1,  Mozilla 1.3 or
above. It should work in all Mozilla based browsers.

Usage:
------
Please see description of window.h2x_get_xhtml below. = function

Demo:
-----
http://html2xhtml.richarea.com/, http://www.richarea.com/demo/

License:
--------
Free for non-commercial using. Please contact author for commercial licenses.

http://javascript.internet.com/generators/html2xhtml.js
==============================================================================*/


// Convert inner text of node to xhtml
// Call: h2x_get_xhtml(node);
//       h2x_get_xhtml(node, lang, encoding) -- to convert whole page
// other parameters are for inner usage and should be omitted
// Parameters:
// node - dom node to convert
// lang - document lang (need it if whole page converted)
// encoding - document charset (need it if whole page converted)
// need_nl - if true, add \n before a tag if it is in list need_nl_before
// inside_pre - if true, do not change content, as it is inside a <pre>
window.h2x_get_xhtml = function(node, lang, encoding, need_nl, inside_pre) {
//add \n before opening tag
var need_nl_before = '|div|p|table|tbody|tr|td|th|title|head|body|script|comment|li|meta|h1|h2|h3|h4|h5|h6|hr|ul|ol|option|';
//add \n after opening tag
var need_nl_after = '|html|head|body|p|th|style|';

var re_comment = new RegExp();
re_comment.compile("^<!--(.*)-->$");


var i;
var text = '';
var children = node.childNodes;
var child_length = children.length;
var tag_name;
var do_nl = need_nl?true:false;
var page_mode = true;

	for (i=0;i<child_length;i++) {
		var child = children[i];

		switch (child.nodeType) {
			case 1: { //ELEMENT_NODE
				var tag_name = String(child.tagName).toLowerCase();

				if (tag_name == '') break;

				if (tag_name == 'meta') {
					var meta_name = String(child.name).toLowerCase();
					if (meta_name == 'generator') break;
				}

				if (!need_nl && tag_name == 'body') { //html fragment mode
					page_mode = false;
				}

				if (tag_name == '!') { //COMMENT_NODE in IE 5.0/5.5
					//get comment inner text
					var parts = re_comment.exec(child.text);

					if (parts) {
						//the last char of the comment text must not be a hyphen
						var inner_text = parts[1];
						text += window.h2x_fix_comment(inner_text);
					}
				} else {
					if (tag_name == 'html'){
						text = '<?xml version="1.0" encoding="'+encoding+'"?>\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n';
					}

					//inset \n to make code more neat
					if (need_nl_before.indexOf('|'+tag_name+'|') != -1) {
						if ((do_nl || text != '') && !inside_pre) text += '\n';
							else do_nl = true;
					}

					text += '<'+tag_name;

					//add attributes
					var attr = child.attributes;
					var attr_length = attr.length;
					var attr_value;

					var attr_lang = false;
					var attr_xml_lang = false;
					var attr_xmlns = false;

					var is_alt_attr = false;

					for (j=0;j<attr_length;j++) {
						var attr_name = attr[j].nodeName.toLowerCase();

						if (!attr[j].specified &&
							(attr_name != 'selected' ||
							!child.selected) &&
							(attr_name != 'style' || //IE 5.0
							child.style.cssText == '') &&
							attr_name != 'value') continue; //IE 5.0

						if (attr_name == '_moz_dirty' ||
							attr_name == '_moz_resizing' ||
							tag_name == 'br' && attr_name == 'type' &&
							child.getAttribute('type') == '_moz') continue;

						var valid_attr = true;

						switch (attr_name) {
							case "style" :
								attr_value = child.style.cssText;
								break;
							case "class" :
								attr_value = child.className;
								break;
							case "http-equiv":
								attr_value = child.httpEquiv;
								break;
							case "noshade": //this set of choices will extend
							case "checked":
							case "selected":
							case "multiple":
							case "nowrap":
							case "disabled":
								attr_value = attr_name;
								break;
							default:
								try {
									attr_value = child.getAttribute(attr_name, 2);
								} catch (e) {
									valid_attr = false;
								}
						}

						//html tag attribs
						if (attr_name == 'lang') {
							attr_lang = true;
							attr_value = lang;
						}
						if (attr_name == 'xml:lang') {
							attr_xml_lang = true;
							attr_value = lang;
						}
						if (attr_name == 'xmlns') attr_xmlns = true;

						if (valid_attr) {
							//value attribute set to "0" is not handled correctly in Mozilla
							if (!(tag_name == 'li' && attr_name == 'value')) {
								text += ' '+attr_name+'="'+window.h2x_fix_attribute(attr_value)+'"';
							}
						}

						if (attr_name == 'alt') is_alt_attr = true;
					}

					if (tag_name == 'img' && !is_alt_attr) {
						text += ' alt=""';
					}

					if (tag_name == 'html') {
						if (!attr_lang) text += ' lang="'+lang+'"';
						if (!attr_xml_lang) text += ' xml:lang="'+lang+'"';
						if (!attr_xmlns) text += ' xmlns="http://www.w3.org/1999/xhtml"';
					}

					if (child.canHaveChildren || child.hasChildNodes()){
						text += '>';
						if (need_nl_after.indexOf('|'+tag_name+'|') != -1) {
//							text += '\n';
						}
						text += h2x_get_xhtml(child, lang, encoding, true,
				inside_pre||tag_name=='pre'?true:false);
						text += '</'+tag_name+'>';
					} else {

						if (tag_name == 'style' || tag_name == 'title' ||
							tag_name == 'script') {

							text += '>';
							var inner_text;
							if (tag_name == 'script') {
								inner_text = child.text;
							}else inner_text = child.innerHTML;

							if (tag_name == 'style') {
								inner_text = String(inner_text).replace(/[\n]+/g,'\n');
							}

							text += inner_text+'</'+tag_name+'>';

						} else {
							text += ' />';
						}
					}

				}
				break;
			}
			case 3: { //TEXT_NODE
				if (!inside_pre) { //do not change text inside <pre> tag
					if (child.nodeValue != '\n') {
						text += window.h2x_fix_text(child.nodeValue);
					}
				} else text += child.nodeValue;
				break;
			}
			case 8: { //COMMENT_NODE
				text += window.h2x_fix_comment(child.nodeValue);
				break;
			}
			default:
				break;
		}
	}

	if (!need_nl && !page_mode) { //delete head and body tags from html fragment
			text = text.replace(/<\/?head>[\n]*/gi, "");
			text = text.replace(/<head \/>[\n]*/gi, "");
			text = text.replace(/<\/?body>[\n]*/gi, "");
	}

	return text;
}

//fix inner text of a comment
window.h2x_fix_comment = function(text){
var re_hyphen = new RegExp();
re_hyphen.compile("-$");


	//delete double hyphens from the comment text
	text = text.replace(/--/g, "__");

	if(re_hyphen.exec(text)){ //last char must not be a hyphen
		text += " ";
	}

	return "<!--"+text+"-->";
}

//fix content of a text node
window.h2x_fix_text = function(text) {
	//convert <,> and & to the corresponding entities
	return String(text).replace(/\n{2,}/g, "\n").replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;");
}

//fix content of attributes href, src or background
window.h2x_fix_attribute = function(text) {
	//convert <,>, & and " to the corresponding entities
	return String(text).replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
}

String.prototype.preize = function() {
	var out = ""
	for (var i = 0; i < this.length; i++) {
		var c = this.charAt(i)
		var cu = this.charCodeAt(i)
		if (c == "&") {
			out += "&amp";
		} else if (c == "<") {
			out += "&lt;"
		} else if (cu > 127) {
			out += "&amp;#" + cu + ";"
		} else if (c == "\n") {
			out += "<br />"
		} else {
			out += c
		}
	}
	
	return	out
}


String.prototype.trim = function() {
	for (var start = 0; start < this.length; start++) {
		var c = this.charAt(start)
		if ((c == ' ') || (c == '\t') || (c == '\n')) {
		} else {
			break;
		}
	}

	for (var end = this.length - 1; end > start; end--) {
		var c = this.charAt(end)
		if ((c == ' ') || (c == '\t') || (c == '\n')) {
		} else {
			break;
		}
	}
	
	return	this.substring(start, end + 1)
}

/*
 *  microformat: vcard/hcard
 */
mf_find("vcard", "http://inside.glnetworks.de/images/mf_hcard.png", function(mfElement, menuElement) {
    vcard_class_list = new Array(
        "url", 
        "fn",
        "email",
        "org",
        "street-address",
        "locality",
        "region",
        "tel",
        "fax",
        "geo",
        "tz",
        "given-name",
        "family-name",
        "country-name",
        "postal-code",
        "post-office-box", "extended-address",
        "additional-names", 
        "honorific-prefix",
        "honorific-suffix"
    )

    e_map = window.mf_elements(mfElement, vcard_class_list)
    
    /*
     *  Construct an address book entry from the elements here
     */
    var result_list = []
    var map_label_list = []
    var map_uri_list = []

    result_list.push('BEGIN:vCard')

    /*
     *  Parts of names
     */
    var name_map = new Object()
    
    var simple_list = [ "given-name", "family-name", "additional-names", "honorific-prefix", "honorific-suffix", "tz", "geo" ]
    for (var si = 0; si < simple_list.length; si++) {
        key_lower = simple_list[si]
        name_map[key_lower] = ""
        
        vs = e_map[key_lower + '.nodes']
        if (vs) {
            v = vs[0]
            if (v.title) {
                name_map[key_lower] = v.title
            } else if (v.mf_text) {
                name_map[key_lower] = window.mf_fix_string(v.mf_text)
            }
        }
    }
    
    // Family Name, Given Name, Additional Names, Honorific Prefixes, and Honorific Suffixes
    var n = 
        name_map["family-name"] + ";" +
        name_map["given-name"] + ";" +
        name_map["additional-names"] + ";" +
        name_map["honorific-prefix"] + ";" +
        name_map["honorific-suffix"]
    if (n != ";;;;") {
        result_list.push("N:" + n)
    } else {
        n = null
    }

    /*
     *  Simple non-repeating elements that are based on text
     */
    var simple2_list = [ "fn", "tz", "geo", "nickname", "org" ]
    for (var si = 0; si < simple2_list.length; si++) {
        key_lower = simple2_list[si]
        key_upper = key_lower.toUpperCase()
        
        vs = e_map[key_lower + '.nodes']
        if (vs) {
            v = vs[0]
            
            text = ""
            if (v.title) {
                text = v.title
            } else if (v.mf_text) {
                text = window.mf_fix_string(v.mf_text)
            }

            if (text.length) {
                result_list.push(key_upper + ":" + text)

                if (key_lower == "geo") {
                    map_label_list.push("... Lat/Lon")
                    map_uri_list.push(text.replace(";", ","))
                }
                
                // generate missing "N"
                if ((n == null) && (key_lower == "fn")) {
                    parts = text.split(" ")
                    if (parts.length == 1) {
                        result_list.push("N:" + parts[0] + ";;;;")
                    } else if (parts.length == 2) {
                        result_list.push("N:" + parts[1] + ";" + parts[0] + ";;;")
                    } else if (parts.length == 3) {
                        result_list.push("N:" + parts[2] + ";" + parts[0] + ";" + parts[1] + ";;")
                    } else if (parts.length == 4) {
                        result_list.push("N:" + parts[3] + ";" + parts[1] + ";" + parts[2] + ";" + parts[0] + ";")
                    }
                    
                    n = 1
                }
            }
        }
    }

    /*
     *  Address types, that repeat and can have additional attributes
     */
    var adr_map = new Object()
    
    var collect_list = [
        "home", "work", "pref", "voice", "fax", "msg",
        "cell", "pager", "bbs", "modem", "car", "isdn",
        "video", "pcs"
    ]
    
    var collect_map = Object()
    for (var ci = 0; ci < collect_list.length; ci++) {
        collect_map[collect_list[ci]] = 1
    }
    
    all_used_classes_list = []
    all_used_classes_map = new Object()

    var complex_list = [ "street-address", "locality", "region", "tel", "fax", "country-name", "postal-code",
        "post-office-box", "extended-address" ]
    for (var ci = 0; ci < complex_list.length; ci++) {
        key_lower = complex_list[ci]
        adr_map[key_lower] = ""
        
        vs = e_map[key_lower + '.nodes']
        if (!vs) {
            continue;
        }
        
        for (var vi = 0; vi < vs.length; vi++) {
            v = vs[vi]

            /*
             *  Try to figure out, looking at all the appropriate parent
             *  classes, what type of address this is. The valid names
             *  are in 'collect_map'
             */
            var all_classes = ""
            
            /*
            if (v.className) {
            	all_classes = v.className
            }
            */
            
            var p = v
            while (p && p != mfElement) {
                if (p.className) {
                    all_classes = all_classes + " " + p.className
                }
                
                p = p.parentNode
            }

            used_classes_list = []
            all_classes_list = all_classes.split(" ")
            
            if (key_lower == "tel") {
            	GM_log(all_classes)
            }

            for (var aci = 0; aci < all_classes_list.length; aci++) {
                className = all_classes_list[aci]
                if (collect_map[className]) {
                    used_classes_list.push(className)
                }
            }
            
            used_classes_str = used_classes_list.join(",").toUpperCase()
            if (used_classes_str.length == 0) {
                used_classes_str = "HOME"
            }
            
            /*
             *  Store it -- we have to play around a little for blank elements
             */
            text = ""
            if (v.title) {
                text = v.title
            } else if (v.mf_text) {
                text = window.mf_fix_string(v.mf_text)
            }

            if (text.length) {
		        GM_log(used_classes_str + "." + key_lower + ":" + text)

                adr_map[used_classes_str + "." + key_lower] = text

                if (!all_used_classes_map[used_classes_str]) {
                    all_used_classes_map[used_classes_str] = 1
                    all_used_classes_list.push(used_classes_str)
                }
            }
        }
    }
    for (var auci = 0; auci < all_used_classes_list.length; auci++) {
        used_classes_str = all_used_classes_list[auci]
        
        // save checking below, I guess
        for (var ci = 0; ci < complex_list.length; ci++) {
            key_lower = complex_list[ci]
            
            if (!adr_map[used_classes_str + "." + key_lower]) {
                adr_map[used_classes_str + "." + key_lower] = ""
            }
        }
        
        // to the post office box; 
        // the extended address; 
        // the street address; 
        // the locality (e.g., city); 
        // the region (e.g., state or province); 
        // the postal code; 
        // the country name
        var adr = 
            adr_map[used_classes_str + ".post-office-box"] + ";" +
            adr_map[used_classes_str + ".extended-address"] + ";" +
            adr_map[used_classes_str + ".street-address"] + ";" +
            adr_map[used_classes_str + ".locality"] + ";" +
            adr_map[used_classes_str + ".region"] + ";" +
            adr_map[used_classes_str + ".postal-code"] + ";" +
            adr_map[used_classes_str + ".country-name"]
        if (adr != ";;;;;;") {
            result_list.push("ADR;TYPE=" + used_classes_str + ":" + adr)

            // menus
            map_label_list.push("... '" + used_classes_str.toLowerCase().replace(",", " ") + "'")
            map_uri_list.push(
                adr_map[used_classes_str + ".street-address"] + "," +
                adr_map[used_classes_str + ".locality"] + "," +
                adr_map[used_classes_str + ".region"] + "," +
                adr_map[used_classes_str + ".postal-code"] + "," +
                adr_map[used_classes_str + ".country-name"])
        }
            
        // TEL
        if (adr_map[used_classes_str + ".tel"]) {
            result_list.push("TEL;TYPE=" + used_classes_str + ":" + adr_map[used_classes_str + ".tel"])
        }
            
        // FAX
        if (adr_map[used_classes_str + ".fax"]) {
            result_list.push("TEL;TYPE=" + used_classes_str + ":" + adr_map[used_classes_str + ".fax"])
        }
    }
    
    // uri based nodes
    var uritype_list = [ "url", "email" ]
    for (var ui = 0; ui < uritype_list.length; ui++) {
        key_lower = uritype_list[ui]
        key_upper = key_lower.toUpperCase()
        
        vs = e_map[key_lower + '.nodes']
        if (!vs) {
            continue;
        }
        
        for (var vi = 0; vi < vs.length; vi++) {
            v = vs[vi]
            
            if (v.href) {
                if (key_upper == "EMAIL") {
                    key_upper = key_upper + ";TYPE=INTERNET"
                    if (v.href.slice(0, 7) == "mailto:") {
                        result_list.push(key_upper + ":" + v.href.slice(7))
                    } else {
                        result_list.push(key_upper + ":" + v.href)
                    }
                } else {
                    result_list.push(key_upper + ":" + v.href)
                }
            }
        }
    }
        
    /*
     *  Finished
     */
    result_list.push('END:vCard')
    result_str = result_list.join("\n")
    
    /*
     *  The menu
     */
    window.mf_add_menu(menuElement, 
        "data:text/x-vcard;base64;charset=utf-8," + window.base64encode(result_str), 
        "Add to Address Book")
    
    if (map_uri_list.length > 0) {
        window.mf_add_label(menuElement, "Show on Google Maps")
        for (var mi = 0; mi < map_uri_list.length; mi++) {
            window.mf_add_menu(menuElement, 
                "http://maps.google.com?q=" + escape(map_uri_list[mi]),
                map_label_list[mi])
        }
    }

    window.mf_add_menu(menuElement, 
        "data:text/plain;base64;charset=utf-8," + window.base64encode(result_str), 
        "Show vcard as text")
})

/*
 *  microformat: xfolk
 */
mf_find("xfolkentry", "http://inside.glnetworks.de/images/mf_xfolk.png", function(mfElement, menuElement) {
    var xfolk_class_list = [
        "taggedlink", 
        "description",
        "extended",
        "tag",
        "title"
    ]

    /*
     *  extract commonly used elements
     */
    var e_map = window.mf_elements(mfElement, xfolk_class_list)
    
    var taggedlink = window.mf_element_href(e_map, "taggedlink")
    var description = window.mf_element_text(e_map, "description", "")
    var extended = window.mf_element_text(e_map, "extended", "")
    var title = window.mf_element_text(e_map, "title", "")
    var tag_list = window.mf_element_textlink_list(e_map, "tag")

    /*
     *  menu item: post to del.ico.us
     *  - XXX: the passing tags doesn't work; it may not be possible
     *  - XXX: my space -> underscore algorithm is probably wrong
     */
    if (taggedlink) {
        tag_text_list = []
        for (var ti = 1; ti < tag_list.length; ti += 2) {
            tag_text_list.push(tag_list[ti].replace(" ", "_"))
        }
        window.mf_add_menu(menuElement, 
            "http://del.icio.us/post/?url=" + escape(taggedlink) + "&tags=" + escape(tag_text_list.join(" ")), 
            "Post to del.icio.us")
    }

    /*
     *  del.icio.us lookup
     */
    if (tag_text_list.length > 0) {
        window.mf_add_label(menuElement, "Lookup on del.ico.us:")

        for (var ti = 0; ti < tag_list.length; ti += 2) {
            uri = tag_list[ti + 0]
            text = tag_list[ti + 1]
            
            window.mf_add_menu(menuElement, 
                "http://del.icio.us/tags/" + escape(text.replace(" ", "_")), 
                "... '" + text + "'")
        }
    }

    /*
     *  technorati lookup
     */
    if (tag_text_list.length > 0) {
        window.mf_add_label(menuElement, "Lookup on Technorati:")

        for (var ti = 0; ti < tag_list.length; ti += 2) {
            uri = tag_list[ti + 0]
            text = tag_list[ti + 1]
            
            window.mf_add_menu(menuElement, 
                "http://technorati.com/tags/" + escape(text), 
                "... '" + text + "'")
        }
    }

    /*
     *  flickr lookup
     */
    if (tag_text_list.length > 0) {
        window.mf_add_label(menuElement, "Lookup on Flickr:")

        for (var ti = 0; ti < tag_list.length; ti += 2) {
            uri = tag_list[ti + 0]
            text = tag_list[ti + 1]
            
            window.mf_add_menu(menuElement, 
                "http://flickr.com/photos/tags/" + escape(text.replace(" ", "_")), 
                "... '" + text + "'")
        }
    }
})

/*
 *  microformat: vcalendar/hcalendar
 */
window.vcalendar_populate = function(mfElement, menuElement) {
    var vcalendar_class_list = [
        "url", 
        "summary",
        "dtstart",
        "dtend",
        "location"
    ]

    /*
     *  Extract all the "vevent"s within the calendar
     */
    var v_map = window.mf_elements(mfElement, [ "vevent" ], 1)
    
    var vevent_list = v_map["vevent.nodes"]
    if (!vevent_list) {
        window.mf_add_label(menuElement, "No events on this calendar")
        return
    }
    
    result_list = []
    var map_label_list = []
    var map_uri_list = []
    
    result_list.push('BEGIN:VCALENDAR')
    result_list.push('PRODID:-//BlogMatrix//microformat-find//EN')
    result_list.push('VERSION:0.03')

    // GM_log("-- producing calendar --")

    for (var vi = 0; vi < vevent_list.length; vi++) {
        vevent = vevent_list[vi]

        result_list.push('BEGIN:VEVENT')

        /*
         *  extract commonly used elements
         */
        var e_map = window.mf_elements(vevent, vcalendar_class_list)

        /*
         *  URI based elements
         */
        var uri_list = [ "url" ]

        for (var i = 0; i < uri_list.length; i++) {
            var key = uri_list[i]
            
            var value = window.mf_element_href(e_map, key)
            if (value) {
                result_list.push(key.toUpperCase() + ':' + value)
            }
        }

        /*
         *  Simple text based elements
         */
        var text_list = [ "summary", "location" ]

        for (var i = 0; i < text_list.length; i++) {
            var key = text_list[i]
            
            var value = window.mf_fix_string(window.mf_element_text(e_map, key), ', ')
            if (value) {
                result_list.push(key.toUpperCase() + ':' + value)

                if (key == "location") {
                    map_label_list.push("... '" + value + "'")
                    map_uri_list.push(value)
                }
            }
        }
        
        /*
         *  Date based elements
         */
        var date_list = [ "dtstart", "dtend" ]

        for (var i = 0; i < date_list.length; i++) {
            var key = date_list[i]
            
            var value = window.mf_fix_string(window.mf_element_text(e_map, key))
            if (value) {
                result_list.push(key.toUpperCase() + ':' + value)
            }
        }

        result_list.push('END:VEVENT')
    }

    result_list.push('END:VCALENDAR')
    result_str = result_list.join("\n")
    
    // GM_log(result_str)

    /*
     *  The menu
     */
    window.mf_add_menu(menuElement, 
        "data:text/x-vcalendar;base64;charset=utf-8," + window.base64encode(result_str), 
        "Add to Calendar")

    if (map_uri_list.length > 0) {
        window.mf_add_label(menuElement, "Show on Google Maps")
        for (var mi = 0; mi < map_uri_list.length; mi++) {
            window.mf_add_menu(menuElement, 
                "http://maps.google.com?q=" + escape(map_uri_list[mi]),
                map_label_list[mi])
        }
    }

    window.mf_add_menu(menuElement, 
        "data:text/plain;base64;charset=utf-8," + window.base64encode(result_str), 
        "Show vcalendar as text")
}

mf_find("vevent", "http://inside.glnetworks.de/images/mf_hcalendar.png", window.vcalendar_populate)


/*
 *  microformat: hatom
 */
mf_find("entry", "http://inside.glnetworks.de/images/mf_hatom.png", function(mfElement, menuElement) {
    var hatom_class_list = [
        "bookmark", 
        "author",
        "published",
        "title",
        "content",
        "ADDRESS",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6"
    ]
    
    /*
     *  extract commonly used elements
     */
    var e_map = window.mf_elements(mfElement, hatom_class_list)
    
    var bookmark = window.mf_element_href(e_map, "bookmark", "")
    var published = window.mf_element_text(e_map, "published", "")
    var content = window.mf_element_html(e_map, "content", "")

    var title = window.mf_element_text(e_map, "H1", null)
    if (!title) title = window.mf_element_text(e_map, "H2", null)
    if (!title) title = window.mf_element_text(e_map, "H3", null)
    if (!title) title = window.mf_element_text(e_map, "H4", null)
    if (!title) title = window.mf_element_text(e_map, "H5", null)
    if (!title) title = window.mf_element_text(e_map, "H6", null)
    if (!title) title = window.mf_element_text(e_map, "title", "")

    var author = window.mf_element_text(e_map, "ADDRESS", null)
    GM_log("author: " + author)
    if (!author) author = window.mf_element_text(e_map, "author", "")

    /*
     *  menu item: reblog
     */
    var reblog_list = []
    reblog_list.push("<html><head><title>Blog This</title>")
	reblog_list.push("</head><body>")
    reblog_list.push("<div style='background: #EEE; border: solid 2px #DDD; padding: 5px; width: 800px; font: 12px courier, monospace; margin:0 auto'>")
    reblog_list.push("&lt;p><br />" + author + " writes in \"&lt;a href=\"" + encodeURI(bookmark) + "\">" + title + "&lt;\a>\":<br />&lt;/p><br />")
    reblog_list.push("&lt;blockquote cite=\"" + encodeURI(bookmark) + "\">")
    reblog_list.push("<div style='background: #FFE; border: solid 2px #FFC; padding: 5px; '>")
    reblog_list.push(content.trim().preize())
    reblog_list.push("</div>")
    reblog_list.push("&lt;/blockquote>")
    reblog_list.push("</div>")

    reblog_list.push("</body></html>")

    window.mf_add_menu(menuElement, 
        "data:text/html;base64;charset=utf-8," + window.base64encode(reblog_list.join("\n")), 
        "Blog this entry")
        
    /*
     *	menu item: print
     */
    var print_list = []
    print_list.push("<html><head><title>" + title + "</title>")
	print_list.push("</head><body>")
    print_list.push("<div style='background: #FFE; border: solid 2px #FFC; padding: 5px; width: 800px; font: 16px arial, sans; margin: 0 auto'>")
    print_list.push("<h1 style='font-size: 18px'>" + title + "</h1>")
    print_list.push(content.trim())
    print_list.push("</div>")

    print_list.push("</body></html>")

    window.mf_add_menu(menuElement, 
        "data:text/html;base64;charset=utf-8," + window.base64encode(print_list.join("\n")), 
        "Print this entry")
    
    /*
     *  menu item: post to del.ico.us
     */
    if (bookmark) {
        window.mf_add_menu(menuElement, "http://del.icio.us/post/?url=" + escape(bookmark) + "&title=" + escape(title), "Post to del.icio.us")
    }
    
    /*
     *  menu item: technorati cosmos
     */
    if (bookmark) {
        window.mf_add_menu(menuElement, "http://www.technorati.com/search.php?s=" + escape(bookmark), "Show Technorati cosmos")
    }
})

