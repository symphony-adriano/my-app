const stocazzo = "<div><a start=\"0\" end=\"4\" href=\"javascript: void(0)\" target=\"_self\" title=\"asdf\" class=\"draftJs__link\"><span data-offset-key=\"2inns-0-0\"><span data-text=\"true\">asdf</span></span></a><span data-offset-key=\"2inns-1-0\"><span data-text=\"true\"> </span></span><a start=\"5\" end=\"9\" href=\"javascript: void(0)\" target=\"_self\" title=\"qwer\" class=\"draftJs__link\"><span data-offset-key=\"2inns-2-0\"><span data-text=\"true\">qwer</span></span></a></div>"

const htmlObject = document.createElement('div');
htmlObject.innerHTML = stocazzo;

console.log(JSON.stringify(htmlObject, null, 2))