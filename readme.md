# Simple Timeline

jQuery-плагин для отображения событий в виде простого линейного таймлайна.

Контейнером данных является таблица, размещенная на странице.

## Подготовка данных

### Двухколоночный вариант.
В первой колонке задается дата в формате DD.MM.YYYY.
Во второй задается HTML-описание события.

```html
<table class="timeline_data">
	<tbody>
		<tr>
			<td>02.03.2010</td>
			<td>2 марта 2010 г. Россия и Хорватия подписали межправительственное соглашение, предусматривающее присоединение Хорватии к проекту «Южный поток». <a href="http://sstream.sh.ms1.ru/press-centr/novosti/novost/?tx_ttnews%5Btt_news%5D=195">Пресс-релиз</a></td>
		</tr>
		<tr class="tr-even tr-2">
			<td>27.11.2009</td>
			<td>27 ноября 2009 г. ОАО «Газпром» и Electricite de France (EDF) подписали Меморандум о взаимопонимании, предусматривающий возможность вхождения EDF в проект строительства морского участка газопровода «Южный поток». <a href="http://sstream.sh.ms1.ru/press-centr/novosti/novost/?tx_ttnews%5Btt_news%5D=92">Пресс-релиз</a></td>
		</tr>
	</tbody>
</table>
```

### Трехколоночный вариант.
В первой колонке размещаются уникальные иконки для событий.
Во второй колонке задается дата в формате DD.MM.YYYY.
В третьей задается HTML-описание события.

```html
<table class="timeline_data">
	<tbody>
		<tr>
			<td><img height="24" width="33" alt="" src="/i/icon1.gif">ru</td>
			<td>02.03.2010</td>
			<td>2 марта 2010 г. Россия и Хорватия подписали межправительственное соглашение, предусматривающее присоединение Хорватии к проекту «Южный поток». <a href="http://sstream.sh.ms1.ru/press-centr/novosti/novost/?tx_ttnews%5Btt_news%5D=195">Пресс-релиз</a></td>
		</tr>
		<tr class="tr-even tr-2">
			<td><img height="24" width="33" alt="" src="/i/icon2.gif">ru</td>
			<td>27.11.2009</td>
			<td>27 ноября 2009 г. ОАО «Газпром» и Electricite de France (EDF) подписали Меморандум о взаимопонимании, предусматривающий возможность вхождения EDF в проект строительства морского участка газопровода «Южный поток». <a href="http://sstream.sh.ms1.ru/press-centr/novosti/novost/?tx_ttnews%5Btt_news%5D=92">Пресс-релиз</a></td>
		</tr>
	</tbody>
</table>
```

## Вызов скрипта

Трехколоночная таблица с иконками:

```javascript
$.simpleTimeline({
	dataTable: '.timeline_data',
	withIcon: true
});
```

Трехколоночная таблица с иконками и интервалом годов:

```javascript
$.simpleTimeline({
	dataTable: '.timeline_data',
	yearFrom: 2007,
	yearTo: 2009,
	withIcon: true
});
```

Трехколоночная таблица с иконками, без скрытия самой таблицы:

```javascript
$.simpleTimeline({
	dataTable: '.timeline_data',
	saveTable: true,
	withIcon: true
});
```

Стадартный двухколоночник:

```javascript
$.simpleTimeline({
	dataTable: '.timeline_data'
});
```

Стадартный двухколоночник с таблицей:

```javascript
$.simpleTimeline({
	dataTable: '.timeline_data',
	saveTable: true
});
```