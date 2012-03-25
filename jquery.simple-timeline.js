(function($) {
	'use strict';
	$.simpleTimeline = function(opts) {
		opts = $.extend({
			dataTable: null,
			yearFrom: null,
			yearTo: null,
			expandAll: false,
			expandAllText: 'Expand all|Hide all',
			startZIndex: 100,
			dayRe: /^(\d+)/,
			monthRe: /\.(\d+)/,
			yearRe: /(\d+)$/,
			withIcon: false,
			saveTable: false,
			actClass: 'act',
			crossWidth: 10,
			crossTop: 16
		}, opts || {});

		if ( !opts.dataTable )
			return;

		var	milliseconds = 1000 * 60 * 60 * 24,
			days = 365;

		var	tmplTable	= '<table class="timeline"><thead><tr>${years}</tr></thead><tbody><tr>${points}</tr></tbody></table>',
			tmplYears	= '<th style="width:${width}%">${year}</th>',
			tmplPoints	= '<td style="width:${width}%"><div></div></td>',
			tmplViewer	= '<div class="timeline_viewer"><em class="event_date">${date}</em><p class="event_content">${desc}</p></div>';

		$(opts.dataTable).each(function() {
			var	_this	= $(this),
				_viewers = null,
				zIndex = opts.startZIndex,
				yearFrom = 0, yearTo = 0,
				dateIndex = opts.withIcon ? 1 : 0,
				descIndex = opts.withIcon ? 2 : 1,
				data = {}, dataList = [],
				rowIndex = 0, maxRowIndex = 0,
				maxSumm = 0, maxDate = '', summ;

			// Подготовка данных для отрисовки
			$('tr', this).each(function(i) {
				var	cells = $('td', this),
					date = cells.eq(dateIndex).text(),
					desc = cells.eq(descIndex).html(),
					className = opts.withIcon ? cells.eq(0).text() : '';
				
				rowIndex++;

				data[rowIndex] = {
					date:		date,
					desc:		desc,
					className:	className,
					day:		date.match(opts.dayRe) ? parseInt(RegExp.$1, 10) : 0,
					month:		date.match(opts.monthRe) ? parseInt(RegExp.$1, 10) : 0,
					year:		date.match(opts.yearRe) ? parseInt(RegExp.$1, 10) : 0
				};
				
				summ = data[rowIndex].year * 10000 + data[rowIndex].month * 100 + data[rowIndex].day;
				if ( summ > maxSumm ) {
					maxSumm = summ;
					maxDate = date;
					maxRowIndex = rowIndex;
				}
				dataList.push([rowIndex, summ]);
				
				yearFrom = yearFrom ? Math.min(data[rowIndex].year, yearFrom) : data[rowIndex].year;
				yearTo = yearTo ? Math.max(data[rowIndex].year, yearTo) : data[rowIndex].year;
			});
			
			// Сортировка 
			function compare(i, ii) {
				if (i[1] > ii[1])
					return 1;
				else if (i[1] < ii[1])
					return -1;
				else
					return 0;
			}
			dataList.sort(compare);

			// Отрисовка таймлайна
			yearFrom = opts.yearFrom || yearFrom;
			yearTo = opts.yearTo || yearTo;

			if ( !yearFrom || !yearTo )
				return;

			var	i = yearFrom,
				years = [], points = [], table, viewer,
				width = 100 / (yearTo - yearFrom + 1);

			for (; i <= yearTo; i++) {
				years.push( tmplYears.replace('${width}', width).replace('${year}', i) );
				points.push( tmplPoints.replace('${width}', width) );
			}

			table = tmplTable.replace('${years}', years.join('')).replace('${points}', points.join(''));
			table = $(table);
			years = $('td div', table);

			table
				.insertBefore(_this)
				.click(function(e) {
					var	_target = $(e.target),
						rowIndex = _target.text();
					if ( _target.is('a') ) {
						_viewers
							.hide()
							.eq(rowIndex - 1)
							.show()
							.css('opacity', 0.1)
							.fadeTo(300, 1);
						$('a', table).removeClass(opts.actClass);
						_target.addClass(opts.actClass);
						return false;
					}
				});
			_this.toggle(opts.saveTable);
			
			// Отрисовка точек
			var	cellWidth = table.width() / years.length,
				cellIndex = 0, pixelLeft = 0, dY = 0,
				index, point, itemLink;

			$.each(dataList, function(i, item) {
				if ( !(index = item[0]) || !(point = data[index]) ) return;

				if ( !point.day || !point.month || !point.year )
					return;

				point.nDay = new Date(point.year, point.month - 1, point.day).getTime() - new Date(point.year, 0, 0).getTime();
				point.nDay = Math.round(point.nDay / milliseconds);
				point.left = 100 * point.nDay / days;
				point.act = point.date == maxDate;
				
				var	itemZ = zIndex,
					itemCellIndex = point.year - yearFrom,
					itemPixelLeft = cellWidth * point.left / 100;

				if ( cellIndex == itemCellIndex && itemPixelLeft - pixelLeft < opts.crossWidth )
					dY += opts.crossTop;
				else
					dY = 0;

				itemLink = $('<a href="#">' + index + '</a>')
					.addClass(opts.withIcon ? point.className : '')
					.addClass(point.act ? opts.actClass : '')
					.attr('title', $('<div/>').html(point.desc).text())
					.css({ left: point.left + '%', zIndex: itemZ })
					.hover(function() { this.style.zIndex = zIndex; }, function() { this.style.zIndex = itemZ; })
					.appendTo( years.eq(itemCellIndex) );
				if ( dY )
					itemLink.css('top', parseInt(itemLink.css('top')) + dY);
				zIndex++;
				cellIndex = itemCellIndex;
				pixelLeft = itemPixelLeft;

				$(tmplViewer.replace('${date}', point.date).replace('${desc}', point.desc))
					.insertBefore(_this)
					.toggle(point.act);
			});

			// Визуализация описаний
			_viewers = _this.prevAll('.timeline_viewer');
			if ( opts.expandAll ) {
				opts.expandAllText = opts.expandAllText.split('|');
				$('<div class="timeline_expand"><a href="#">' + opts.expandAllText[0] + '</a></div>')
					.insertAfter(table)
					.find('a')
					.click(function() {
						opts.expandAll = !opts.expandAll;
						_viewers.toggle(!opts.expandAll);
						$(this).html(opts.expandAll ? opts.expandAllText[0] : opts.expandAllText[1]);
						return false;
					});
			}
		});
	};
})(jQuery);