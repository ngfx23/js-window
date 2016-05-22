var EventUtil = {
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
};

window.onload = function() {
	var windows = document.getElementById('windows');
	new windowCreate(windows);
	//	var windowsOne = document.getElementById('windowsOne');
	//		new windowCreate(windowsOne);
};

function windowCreate(windows) {
	this.windows = windows;
	this.windowsContent = null;
	this.init();
}
windowCreate.prototype = {
	init: function() {
		var _this = this;
		/* 创建-外围window的div */
		var windowsWarpper = document.createElement('div');
		windowsWarpper.className = "windows-warpper";
		windows.appendChild(windowsWarpper);

		/* 创建-window的窗口输入位置   */
		var windowsInputPosition = document.createElement('div'),
			windowInputPosition_label = document.createElement('label'),
			windowInputPosition_labelText = document.createTextNode("Input Position(x,y)"),
			windowInputPosition_inputX = document.createElement('input'),
			windowInputPosition_inputY = document.createElement('input');

		windowInputPosition_inputX.type = "text";
		windowInputPosition_inputY.type = "text";

		windowInputPosition_inputX.value = "200";
		windowInputPosition_inputY.value = "10";

		windowsInputPosition.className = 'input-class';

		windowInputPosition_label.appendChild(windowInputPosition_labelText);
		windowsInputPosition.appendChild(windowInputPosition_label);
		windowsInputPosition.appendChild(windowInputPosition_inputX);
		windowsInputPosition.appendChild(windowInputPosition_inputY);
		windowsWarpper.appendChild(windowsInputPosition);

		/* 创建-window的窗口大小   */
		var windowsInputSize = document.createElement('div'),
			windowsInputSize_lable = document.createElement('label'),
			windowsInputSize_labelText = document.createTextNode("Input Size(width,height)"),
			windowsInputSize_width = document.createElement('input'),
			windowsInputSize_height = document.createElement('input');

		windowsInputSize_width.type = "text";
		windowsInputSize_height.type = "text";
		windowsInputSize_width.value = "300";
		windowsInputSize_height.value = "400";

		windowsInputSize.className = 'input-class';

		windowsInputSize_lable.appendChild(windowsInputSize_labelText);
		windowsInputSize.appendChild(windowsInputSize_lable);
		windowsInputSize.appendChild(windowsInputSize_width);
		windowsInputSize.appendChild(windowsInputSize_height);
		windowsWarpper.appendChild(windowsInputSize);

		/* 创建-window的头部标题 */
		var windowsInputHeader = document.createElement('div'),
			windowsInputHeader_lable = document.createElement('label'),
			windowsInputHeader_labelText = document.createTextNode("Input Header Text"),
			windowsInputHeader_headerText = document.createElement('input');

		windowsInputHeader_headerText.type = "text";
		windowsInputHeader_headerText.value = "windows"
		windowsInputHeader.className = 'input-class'

		windowsInputHeader_lable.appendChild(windowsInputHeader_labelText);
		windowsInputHeader.appendChild(windowsInputHeader_lable);
		windowsInputHeader.appendChild(windowsInputHeader_headerText);
		windowsWarpper.appendChild(windowsInputHeader);

		/* 创建-window的创建按钮 */
		var windowsButton = document.createElement('button'),
			windowsButtonText = document.createTextNode("create window");
		windowsButton.className = 'button-class';
		windowsButton.appendChild(windowsButtonText);
		windowsWarpper.appendChild(windowsButton);

		/*创建-window的内容区域*/
		var windowsContent = document.createElement('div');
		windowsContent.className = 'window-conteiner';
		windowsWarpper.appendChild(windowsContent);

		EventUtil.addHandler(windowsButton, 'click', function() {
			_this.createWindow(windowInputPosition_inputX.value, windowInputPosition_inputY.value,
				windowsInputSize_width.value, windowsInputSize_height.value,
				windowsInputHeader_headerText.value, windowsContent);
		});
		_this.createWindow(10, 10, 300, 300, "dsfsfdsf", windowsContent);

	},
	createWindow: function(windowX, windowY, windowWidth, windowHeight,
		windowHeaderTitle, windowsContent) {
		var _this = this;
		/* 自创建窗口 */
		var windows_childWrapper = document.createElement('div'),
			windows_childWrapper_header = document.createElement('div'),
			windows_childWrapper_header_title = document.createElement('h3'),
			windows_childWrapper_header_titleText = document.createTextNode(windowHeaderTitle),
			windows_childWrapper_header_buttons = document.createElement('div'),
			windows_childWrapper_header_buttons_min = document.createElement('button'),
			windows_childWrapper_header_buttons_max = document.createElement('button'),
			windows_childWrapper_header_buttons_close = document.createElement('button'),
			windows_childWrapper_body = document.createElement('textarea');

		/* 设置自定义窗口的样式 */
		windows_childWrapper.style.position = "absolute";
		this.setWindowStyle(windows_childWrapper, windowY + "px",
			windowX + "px", windowWidth + "px", windowHeight + "px",
			windows_childWrapper, "windows-childWrapper-class");
		windows_childWrapper.style.zIndex = 10;

		windows_childWrapper_header_titleText.className = "windows-childWrapper-header-titleText";
		windows_childWrapper_header_buttons_min.className = "min-class";
		windows_childWrapper_header_buttons_max.className = "max-class";
		windows_childWrapper_header_buttons_close.className = "close-class";
		windows_childWrapper_header.className = "windows-childWrapper-header-class fn-clear";
		windows_childWrapper_body.className = "windows-childWrapper-body";

		windows_childWrapper_header_title.appendChild(windows_childWrapper_header_titleText);
		windows_childWrapper_header.appendChild(windows_childWrapper_header_title);
		windows_childWrapper_header_buttons.appendChild(windows_childWrapper_header_buttons_min);
		windows_childWrapper_header_buttons.appendChild(windows_childWrapper_header_buttons_max);
		windows_childWrapper_header_buttons.appendChild(windows_childWrapper_header_buttons_close);
		windows_childWrapper_header.appendChild(windows_childWrapper_header_buttons);
		windows_childWrapper.appendChild(windows_childWrapper_header);
		windows_childWrapper.appendChild(windows_childWrapper_body);
		windowsContent.appendChild(windows_childWrapper);

		/* 窗口聚焦和层叠 */
		var flag = false;
		EventUtil.addHandler(windows_childWrapper, 'click', function(ev) {
			flag = !flag;
			_this.windowHasFacus(flag, windows_childWrapper);
			ev = EventUtil.getEvent(ev);
			EventUtil.stopPropagation(ev);

		});
		EventUtil.addHandler(document, 'click', function() {
			windows_childWrapper.style.background = "#cdf";
			windows_childWrapper.style.zIndex = 10;
		});

		/* 最小化 */
		var minFlag = false,
			maxFlag = false,
			textArea = windows_childWrapper.lastChild;
		EventUtil.addHandler(windows_childWrapper_header_buttons_min, 'click', function() {
			windows_childWrapper_header_buttons_max.className = "max-class";
			minFlag = !minFlag;
			if (maxFlag == true) {
				maxFlag = !maxFlag;
			}
			_this.windowMin(minFlag, windows_childWrapper, this, textArea,
				windowX, windowY, windowWidth, windowHeight);

		});

		/* 最大化窗口 */

		EventUtil.addHandler(windows_childWrapper_header_buttons_max, 'click', function() {
			textArea.style.height = "88%";
			windows_childWrapper.style.height = windowHeight + "px";
			windows_childWrapper_header_buttons_min.className = "min-class";
			if (minFlag == true) {
				minFlag = !minFlag;
			}
			maxFlag = !maxFlag;
			_this.windowMax(maxFlag, windows_childWrapper, this,
				windowX, windowY, windowWidth, windowHeight);
		});

		/* 关闭窗口 */
		EventUtil.addHandler(windows_childWrapper_header_buttons_close, 'click', function() {
			windowsContent.removeChild(windows_childWrapper);
		});

		/* 窗口位置移动 */
		EventUtil.addHandler(windows_childWrapper_header, 'mousedown', function(ev) {
			ev = EventUtil.getEvent(ev);
			var disX = ev.clientX - windows_childWrapper.offsetLeft,
				disY = ev.clientY - windows_childWrapper.offsetTop;
			windows_childWrapper_header.style.cursor = "move";
			//			console.info(disX)
			document.onmousemove = function(ev) {
				ev = EventUtil.getEvent(ev);
				var l = ev.clientX - disX,
					t = ev.clientY - disY;
				if (l < 1) {
					l = 0;
				} else if (l > windowsContent.offsetWidth - windows_childWrapper.offsetWidth) {
					l = windowsContent.offsetWidth - windows_childWrapper.offsetWidth;
					
				}
				if (t < 1) {
					t = 0;
				} else if (t > windowsContent.offsetHeight -
					windows_childWrapper.offsetHeight) {
					t = windowsContent.offsetHeight - windows_childWrapper.offsetHeight;
				}
				windows_childWrapper.style.left = l + 'px';
				windows_childWrapper.style.top = t + 'px';
				windowX = l;
				windowY = t;
			};
			document.onmouseup = function() {
				windows_childWrapper_header.style.cursor = "default";
				document.onmousemove = null;
				document.onmouseup = null;
			};
			//			EventUtil.addHandler(windows_childWrapper, 'mousemove',
			//				_this.windowDrag(ev, windows_childWrapper, windowsContent, disX, disY));
			//			EventUtil.removeHandler(windows_childWrapper, 'mouseup',
			//				_this.windowDrag(ev, windows_childWrapper, windowsContent, disX, disY));
			EventUtil.preventDefault(ev);
			EventUtil.stopPropagation(ev);
		});
		EventUtil.addHandler(windows_childWrapper, 'mouseover', function(ev) {
			ev = EventUtil.getEvent(ev);
			var disX = ev.clientX - windows_childWrapper.offsetLeft,
				disY = ev.clientY - windows_childWrapper.offsetTop;
//			console.info(ev.clientY + ",,," + disY);
//			console.info("flag:max--"+maxFlag+"---min---"+minFlag);
			if (maxFlag == false && minFlag == false) {
				if ((ev.clientX - disX) >= 0 && (ev.clientX - disX) <= 10) {
					windows_childWrapper.style.cursor = "e-resize";
				}
			}
		});
	},
	windowHasFacus: function(flag, windows_childWrapper) {
		if (flag) {
			windows_childWrapper.style.background = "#6bafe3";
			windows_childWrapper.style.zIndex = 101;
		} else {
			windows_childWrapper.style.background = "#cdf";
			windows_childWrapper.style.zIndex = 10;
		}
	},
	windowMin: function(minFlag, windows_childWrapper,
		windows_childWrapper_header_buttons_min, textArea,
		windowX, windowY, windowWidth, windowHeight) {
		console.info(windowHeight)
		if (minFlag) {
			textArea.style.height = 0;
			windows_childWrapper.style.height = windowHeight / 10 + "px";
			windows_childWrapper.firstChild.style.height = "100%";
			windows_childWrapper_header_buttons_min.className = "resize-class";
		} else {
			textArea.style.height = "88%";
			windows_childWrapper.firstChild.style.height = "10%";

			this.setWindowStyle(windows_childWrapper, windowY + "px",
				windowX + "px", windowWidth + "px", windowHeight + "px",
				windows_childWrapper_header_buttons_min, "min-class");
		}
	},
	windowMax: function(maxFlag, windows_childWrapper, windows_childWrapper_header_buttons_max,
		windowX, windowY, windowWidth, windowHeight) {
		if (maxFlag) {
			this.setWindowStyle(windows_childWrapper, 0, 0, "100%", "100%",
				windows_childWrapper_header_buttons_max, "resize-class");
		} else {
			this.setWindowStyle(windows_childWrapper, windowY + "px",
				windowX + "px", windowWidth + "px", windowHeight + "px",
				windows_childWrapper_header_buttons_max, "max-class");
		}
	},
	windowDrag: function(ev, windows_childWrapper, windowsContent, disX, disY) {
		ev = EventUtil.getEvent(ev);
		var l = ev.clientX - disX,
			t = ev.clientY - disY;
		console.info(l + "-" + t)
		if (l < 1) {
			l = 0;
		} else if (l > windowsContent.offsetWidth - windows_childWrapper.offsetWidth) {
			l = windowsContent.offsetWidth - windows_childWrapper.offsetWidth;
		}
		if (t < 1) {
			t = 0;
		} else if (t > windowsContent.offsetHeight - windows_childWrapper.offsetHeight) {
			t = windowsContent.offsetHeight - windows_childWrapper.offsetHeight;
		}
		windows_childWrapper.style.left = l + 'px';
		windows_childWrapper.style.top = t + 'px';
	},
	setWindowStyle: function(windows_childWrapper, top, left, x, y, windowSome, windowSomeClassStyle) {
		windows_childWrapper.style.top = top;
		windows_childWrapper.style.left = left;
		windows_childWrapper.style.width = x;
		windows_childWrapper.style.height = y;
		windowSome.className = windowSomeClassStyle;
	},
}