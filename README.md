<h1 align="center">Дипломный проект: "Movies-Explorer" (backend)</h1>

<a name="summary">
  <details>
    <summary>Оглавление</summary>
    <ol>
      <li><a href="#project-description">Описание проекта</a></li>
      <li><a href="#project-installation">Эксплуатация проекта</a></li>
      <li><a href="#project-functionality">Функциональность проекта</a></li>
      <li><a href="#project-enhancement">Планы по улучшению</a></li>
    </ol>
  </details>
</a>

<a name="project-description"><h2>1. Описание проекта</h2></a>
Дипломный проект "Movies-Explorer" - веб-приложение для поиска и ознакомления с трейлерами фильмов международного фестиваля документального кино. Проект выполнен в рамках обучения на курсе "Веб-разработчик" от "Яндекс.Практикум". API приложения было написано на express.js, с использованием библиотек, реализующих cors, а также с помощью ряда библиотек, обеспечивающих безопасность приходящих на сервер запросов.

Проект доступен по ссылке:
<br>
backend - https://api.woobotgjr.movies.nomoredomainsrocks.ru/"
<br>

<i>Проект был проверен опытными ревьюерами согласно чеклисту</i>

<a name="project-installation"><h2>2. Эксплуатация проекта</h2></a>

1. git clone https://github.com/WoobotGJR/movies-explorer-frontend - клонировать репозиторий
2. npm i - установить зависимости (dependencies)
3. npm run start - запустить приложение
4. npm run build - создать build приложения

<a name="functionality"><h2>3. Функциональность проекта</h2></a>

- CORS технология
- Защита запросов (например от межсайтового скриптинга)
- Ограничение лимита запросов на сервер с одного ip
- Валидация запросов, приходяших на сервер с помощью JOI
- Работа с базой данных (MongoDB) при помощи mongoose

<a name="enhancement"><h2>4. Планы по улучшению</h2></a>

- Переписать проект на node.js для лучшего понимания функциональности используемых инструментов
