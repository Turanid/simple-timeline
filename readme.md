# Simple Timeline

jQuery-плагин для отображения событий в виде простого линейного таймлайна.

Примеры работы смотрим здесь: http://albburtsev.github.com/simple-timeline.

Контейнером данных является таблица, размещенная на странице.

## Подготовка данных

### Двухколоночный вариант.
В первой колонке задается дата в формате DD.MM.YYYY.
Во второй задается HTML-описание события.

```html
<table class="timeline_data">
	<tbody>
		<tr>
			<td>09.07.2011</td>
			<td>9 июля 2011 г. Самое последнее из событий в таблице</td>
		</tr>
		<tr>
			<td>02.03.2010</td>
			<td>2 марта 2010 г. Россия и Хорватия подписали межправительственное соглашение, предусматривающее присоединение Хорватии к проекту «Южный поток». <a href="#">Пресс-релиз</a></td>
		</tr>
		<tr>
			<td>27.11.2009</td>
			<td>27 ноября 2009 г. ОАО «Газпром» и Electricite de France (EDF) подписали Меморандум о взаимопонимании, предусматривающий возможность вхождения EDF в проект строительства морского участка газопровода «Южный поток». <a href="#">Пресс-релиз</a></td>
		</tr>
	</tbody>
</table>
```

### Трехколоночный вариант.
В первой колонке размещается строка класса, которым будет специфицирована точка на таймлайне. С помощью этого механизма можно переопределять внешний вид точек, например переопределять иконку.
Во второй колонке задается дата в формате DD.MM.YYYY.
В третьей задается HTML-описание события.

```html
<table class="timeline_data timeline_data_3col">
	<tbody>
		<tr>
			<td>ru</td>
			<td>09.07.2011</td>
			<td>9 июля 2011 г. Самое последнее из случившихся событий</td>
		</tr>
		<tr>
			<td>ru</td>
			<td>02.03.2010</td>
			<td>2 марта 2010 г. Россия и Хорватия подписали межправительственное соглашение, предусматривающее присоединение Хорватии к проекту «Южный поток». <a href="#">Пресс-релиз</a></td>
		</tr>
		<tr>
			<td>ru</td>
			<td>27.11.2009</td>
			<td>27 ноября 2009 г. ОАО «Газпром» и Electricite de France (EDF) подписали Меморандум о взаимопонимании, предусматривающий возможность вхождения EDF в проект строительства морского участка газопровода «Южный поток». <a href="#">Пресс-релиз</a></td>
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

## Доступные опции

### Опция "dataTable"
Строковый селектор таблицы с данными, единственная обязательная опция.

### Опция "saveTable"
Флаг, указывающий на отображение таблицы одновременно с таймлайном, по умолчанию - false.

### Опция "withIcon"
Флаг, указывающий что таблица с данными является трехколоночной, с селекторами точек в первой колонке, по умолчанию - false.

### Опция "yearFrom"
Целочисленное значение наименьшего года для отображения на таймлайне.

### Опция "yearTo"
Целочисленное значение наибольшего года для отображения на таймлайне.

### Опция "expandAll"
По умолчанию все подписи к точкам таймлайна скрыты, кроме текущей.
Если в вызове передать опцию ```expandAll: true```, между таймлайном и подписью появится ссылка, позволяющая отображать/скрывать все подписи.
По умолчанию текст её состояний "Expand all" и "Hide all".
Можно его произвольно менять с помощью опции expandAllText: ```expandAllText: 'Показать все|Скрыть все'```
Пример вызова:

```javascript
$.simpleTimeline({
	dataTable: '.timeline_data',
	expandAll: true
});
```